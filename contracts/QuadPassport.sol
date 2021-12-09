//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "./QuadPassportStore.sol";
import "./interfaces/IQuadPassport.sol";

contract QuadPassport is IQuadPassport, ERC1155Upgradeable, UUPSUpgradeable, QuadPassportStore {
    event GovernanceUpdated(address _oldGovernance, address _governance);

    function initialize(
        address _governanceContract,
        string memory _uri
    ) public initializer {
        require(_governanceContract != address(0), "GOVERNANCE_ADDRESS_ZERO");
        __ERC1155_init(_uri);
        governance = QuadGovernance(_governanceContract);
    }

    function mintPassport(
        uint256 _tokenId,
        bytes32 _quadDID,
        bytes32 _aml,
        bytes32 _country,
        uint256 _issuedAt,
        bytes calldata _sig
    ) external payable override {
        require(msg.value == governance.mintPrice(), "INVALID_MINT_PRICE");
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        require(balanceOf(_msgSender(), _tokenId) == 0, "PASSPORT_ALREADY_EXISTS");

        (bytes32 hash, address issuer) = _verifyIssuerMint(_msgSender(), _tokenId, _quadDID, _aml, _country, _issuedAt, _sig);

        _accountBalancesETH[issuer] += governance.mintPrice();
        _usedHashes[hash] = true;
        _validSignatures[_msgSender()][_tokenId] = _sig;
        _issuedEpoch[_msgSender()][_tokenId] = _issuedAt;
        _attributes[_msgSender()][keccak256("COUNTRY")] = Attribute({value: _country, epoch: _issuedAt, issuer: issuer});
        _attributes[_msgSender()][keccak256("DID")] = Attribute({value: _quadDID, epoch: _issuedAt, issuer: issuer});
        _attributesByDID[_quadDID][keccak256("AML")] = Attribute({value: _aml, epoch: _issuedAt, issuer: issuer});
        _mint(_msgSender(), _tokenId, 1, "");
    }

    function setAttribute(
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt,
        bytes calldata _sig
    ) external payable override {
        require(msg.value == governance.mintPricePerAttribute(_attribute), "INVALID_ATTR_MINT_PRICE");
        (bytes32 hash, address issuer) = _verifyIssuerSetAttr(_msgSender(), _tokenId, _attribute, _value, _issuedAt, _sig);

        _accountBalancesETH[issuer] += governance.mintPricePerAttribute(_attribute);
        _usedHashes[hash] = true;
        _setAttributeInternal(_msgSender(), _tokenId, _attribute, _value, _issuedAt, issuer);
    }

    function setAttributeIssuer(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt
    ) external override {
        require(governance.hasRole(ISSUER_ROLE, _msgSender()), "INVALID_ISSUER");
        _setAttributeInternal(_account, _tokenId, _attribute, _value, _issuedAt, _msgSender());
    }

    function _setAttributeInternal(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt,
        address _issuer
    ) internal {
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        require(balanceOf(_account, _tokenId) == 1, "PASSPORT_DOES_NOT_EXISTS");
        require(governance.eligibleAttributes(_attribute)
            || governance.eligibleAttributesByDID(_attribute),
            "ATTRIBUTE_NOT_ELIGIBLE"
        );
        if (governance.eligibleAttributes(_attribute)) {
            _attributes[_account][_attribute] = Attribute({
                value: _value,
                epoch: _issuedAt,
                issuer: _issuer
            });
        } else {
            // Attribute grouped by DID
            bytes32 dID = _attributes[_account][keccak256("DID")].value;
            require(dID != bytes32(0), "DID_NOT_FOUND");
            _attributesByDID[dID][_attribute] = Attribute({
                value: _value,
                epoch: _issuedAt,
                issuer: _issuer
            });
        }
    }

    function burnPassport(
        uint256 _tokenId
    ) external override {
        require(balanceOf(_msgSender(), _tokenId) == 1, "CANNOT_BURN_ZERO_BALANCE");
        _burn(_msgSender(), _tokenId, 1);

        for (uint256 i = 0; i < governance.getSupportedAttributesLength(); i++) {
            bytes32 attributeType = governance.supportedAttributes(i);
            delete _attributes[_msgSender()][attributeType];
        }
    }

    function getAttributeETH(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute
    ) external payable override returns(bytes32, uint256) {
        Attribute memory attribute = _getAttributeInternal(_account, _tokenId, _attribute);
        _doETHPayment(_attribute, attribute.issuer);
        return (attribute.value, attribute.epoch);
    }

    function getAttributeFree(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute
    ) external view override returns(bytes32, uint256) {
        require(governance.pricePerAttribute(_attribute) == 0, "ATTRIBUTE_NOT_FREE");
        Attribute memory attribute = _getAttributeInternal(_account, _tokenId, _attribute);
        return (attribute.value, attribute.epoch);
    }

    function getAttribute(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        address _tokenAddr
    ) external override returns(bytes32, uint256) {
        Attribute memory attribute = _getAttributeInternal(_account, _tokenId, _attribute);
        _doTokenPayment(_attribute, _tokenAddr, attribute.issuer);
        return (attribute.value, attribute.epoch);
    }

    function _getAttributeInternal(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute
    ) internal view returns(Attribute memory) {
        require(_account != address(0), "ACCOUNT_ADDRESS_ZERO");
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        require(balanceOf(_account, _tokenId) == 1, "PASSPORT_DOES_NOT_EXIST");
        require(governance.eligibleAttributes(_attribute)
            || governance.eligibleAttributesByDID(_attribute),
            "ATTRIBUTE_NOT_ELIGIBLE"

        );
        if (governance.eligibleAttributes(_attribute)) {
            return _attributes[_account][_attribute];
        }

        // Attribute grouped by DID
        bytes32 dID = _attributes[_account][keccak256("DID")].value;
        require(dID != bytes32(0), "DID_NOT_FOUND");
        return _attributesByDID[dID][_attribute];
    }

    function getPassportSignature(
        uint256 _tokenId
    ) external view override returns(bytes memory) {
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        return _validSignatures[_msgSender()][_tokenId];
    }

    function _verifyIssuerMint(
        address _account,
        uint256 _tokenId,
        bytes32 _quadDID,
        bytes32 _aml,
        bytes32 _country,
        uint256 _issuedAt,
        bytes calldata _sig
    ) internal view returns(bytes32,address){
        bytes32 hash = keccak256(abi.encode(_account, _tokenId, _quadDID, _aml, _country,  _issuedAt));
        require(!_usedHashes[hash], "SIGNATURE_ALREADY_USED");

        bytes32 signedMsg = ECDSAUpgradeable.toEthSignedMessageHash(hash);
        address issuer = ECDSAUpgradeable.recover(signedMsg, _sig);
        require(governance.hasRole(ISSUER_ROLE, issuer), "INVALID_ISSUER");

        return (hash, issuer);
    }

    function _verifyIssuerSetAttr(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt,
        bytes calldata _sig
    ) internal view returns(bytes32,address) {
        bytes32 hash = keccak256(abi.encode(_account, _tokenId, _attribute, _value, _issuedAt));

        require(!_usedHashes[hash], "SIGNATURE_ALREADY_USED");

        bytes32 signedMsg = ECDSAUpgradeable.toEthSignedMessageHash(hash);
        address issuer = ECDSAUpgradeable.recover(signedMsg, _sig);
        require(governance.hasRole(ISSUER_ROLE, issuer), "INVALID_ISSUER");

        return (hash, issuer);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Upgradeable) {
    require(
        (from == address(0) && to != address(0))
        || (from != address(0) && to == address(0)),
        "ONLY_MINT_OR_BURN_ALLOWED"
    );
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Upgradeable, IERC165Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _doETHPayment(
        bytes32 _attribute,
        address _issuer
    ) internal {
        uint256 amountETH = calculatePaymentETH(_attribute);
        if (amountETH > 0) {
            require(
                 msg.value == amountETH,
                "INSUFFICIENT_PAYMENT_ALLOWANCE"
            );
            uint256 amountIssuer = amountETH * governance.revSplitIssuer() / 1e2;
            uint256 amountProtocol = amountETH - amountIssuer;
            _accountBalancesETH[_issuer] += amountIssuer;
            _accountBalancesETH[governance.treasury()] += amountProtocol;
        }
    }

    function _doTokenPayment(
        bytes32 _attribute,
        address _tokenPayment,
        address _issuer
    ) internal {
        uint256 amountToken = calculatePaymentToken(_attribute, _tokenPayment);
        if (amountToken > 0) {
            IERC20MetadataUpgradeable erc20 = IERC20MetadataUpgradeable(_tokenPayment);
            require(
                erc20.transferFrom(_msgSender(), address(this), amountToken),
                "INSUFFICIANT_PAYMENT_ALLOWANCE"
            );
            uint256 amountIssuer = amountToken * governance.revSplitIssuer() / 10 ** 2;
            uint256 amountProtocol = amountToken - amountIssuer;
            _accountBalances[_tokenPayment][_issuer] += amountIssuer;
            _accountBalances[_tokenPayment][governance.treasury()] += amountProtocol;
        }
    }

    function withdrawETH(address payable _to) external override {
       require(_to != address(0), "WITHDRAW_ADDRESS_ZERO");
       uint256 currentBalance = _accountBalancesETH[_to];
       require(currentBalance > 0, "NOT_ENOUGH_BALANCE");
       _accountBalancesETH[_to] = 0;
       _to.transfer(currentBalance);
    }

    function withdrawToken(address payable _to, address _token) external override {
       require(_to != address(0), "WITHDRAW_ADDRESS_ZERO");
       uint256 currentBalance = _accountBalances[_token][_to];
       require(currentBalance > 0, "NOT_ENOUGH_BALANCE");
       _accountBalances[_token][_to] = 0;
        IERC20MetadataUpgradeable erc20 = IERC20MetadataUpgradeable(_token);
       erc20.transfer(_to, currentBalance);
    }

    function calculatePaymentToken(
        bytes32 _attribute,
        address _tokenPayment
    ) public view override returns(uint256) {
        IERC20MetadataUpgradeable erc20 = IERC20MetadataUpgradeable(_tokenPayment);
        uint256 tokenPrice = governance.getPrice(_tokenPayment);
        // Convert to Token Decimal
        uint256 amountToken = (governance.pricePerAttribute(_attribute) * (10 ** (erc20.decimals())) / tokenPrice) ;
        return amountToken;
    }

    function calculatePaymentETH(
        bytes32 _attribute
    ) public view override returns(uint256) {
        uint256 tokenPrice = governance.getPriceETH();
        uint256 amountETH = (governance.pricePerAttribute(_attribute) * 1e18 / tokenPrice) ;
        return amountETH;
    }

    // Admin function
    function setGovernance(address _governanceContract) external override {
        require(_msgSender() == address(governance), "ONLY_GOVERNANCE_CONTRACT");
        require(_governanceContract != address(governance), "GOVERNANCE_ALREADY_SET");
        require(_governanceContract != address(0), "GOVERNANCE_ADDRESS_ZERO");
        address oldGov = address(governance);
        governance = QuadGovernance(_governanceContract);

        emit GovernanceUpdated(oldGov, address(governance));
    }

    function _authorizeUpgrade(address) internal view override {
        require(governance.hasRole(GOVERNANCE_ROLE, _msgSender()), "INVALID_ADMIN");
    }
}
