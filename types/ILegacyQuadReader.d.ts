/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ILegacyQuadReaderInterface extends ethers.utils.Interface {
  functions: {
    "calculatePaymentETH(bytes32,address)": FunctionFragment;
    "calculatePaymentToken(bytes32,address,address)": FunctionFragment;
    "getAttributes(address,uint256,bytes32,address)": FunctionFragment;
    "getAttributesETH(address,uint256,bytes32)": FunctionFragment;
    "getAttributesETHExcluding(address,uint256,bytes32,address[])": FunctionFragment;
    "getAttributesETHIncludingOnly(address,uint256,bytes32,address[])": FunctionFragment;
    "getAttributesExcluding(address,uint256,bytes32,address,address[])": FunctionFragment;
    "getAttributesFree(address,uint256,bytes32)": FunctionFragment;
    "getAttributesFreeExcluding(address,uint256,bytes32,address[])": FunctionFragment;
    "getAttributesFreeIncludingOnly(address,uint256,bytes32,address[])": FunctionFragment;
    "getAttributesIncludingOnly(address,uint256,bytes32,address,address[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calculatePaymentETH",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "calculatePaymentToken",
    values: [BytesLike, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributes",
    values: [string, BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesETH",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesETHExcluding",
    values: [string, BigNumberish, BytesLike, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesETHIncludingOnly",
    values: [string, BigNumberish, BytesLike, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesExcluding",
    values: [string, BigNumberish, BytesLike, string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesFree",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesFreeExcluding",
    values: [string, BigNumberish, BytesLike, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesFreeIncludingOnly",
    values: [string, BigNumberish, BytesLike, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAttributesIncludingOnly",
    values: [string, BigNumberish, BytesLike, string, string[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "calculatePaymentETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculatePaymentToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesETHExcluding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesETHIncludingOnly",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesExcluding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesFree",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesFreeExcluding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesFreeIncludingOnly",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAttributesIncludingOnly",
    data: BytesLike
  ): Result;

  events: {};
}

export class ILegacyQuadReader extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ILegacyQuadReaderInterface;

  functions: {
    calculatePaymentETH(
      _attribute: BytesLike,
      _account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculatePaymentToken(
      _attribute: BytesLike,
      _tokenPayment: string,
      _account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAttributes(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAttributesETH(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAttributesETHExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAttributesETHIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAttributesExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _excludedIssuers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAttributesFree(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesFreeExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesFreeIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _onlyIssuers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  calculatePaymentETH(
    _attribute: BytesLike,
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculatePaymentToken(
    _attribute: BytesLike,
    _tokenPayment: string,
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAttributes(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    _tokenAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAttributesETH(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAttributesETHExcluding(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    _excludedIssuers: string[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAttributesETHIncludingOnly(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    _onlyIssuers: string[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAttributesExcluding(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    _tokenAddr: string,
    _excludedIssuers: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAttributesFree(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[], string[]]>;

  getAttributesFreeExcluding(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    _excludedIssuers: string[],
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[], string[]]>;

  getAttributesFreeIncludingOnly(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    _onlyIssuers: string[],
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[], string[]]>;

  getAttributesIncludingOnly(
    _account: string,
    _tokenId: BigNumberish,
    _attribute: BytesLike,
    _tokenAddr: string,
    _onlyIssuers: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    calculatePaymentETH(
      _attribute: BytesLike,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculatePaymentToken(
      _attribute: BytesLike,
      _tokenPayment: string,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAttributes(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesETH(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesETHExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesETHIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _excludedIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesFree(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesFreeExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesFreeIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;

    getAttributesIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _onlyIssuers: string[],
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[], string[]]>;
  };

  filters: {};

  estimateGas: {
    calculatePaymentETH(
      _attribute: BytesLike,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculatePaymentToken(
      _attribute: BytesLike,
      _tokenPayment: string,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAttributes(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAttributesETH(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAttributesETHExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAttributesETHIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAttributesExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _excludedIssuers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAttributesFree(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAttributesFreeExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAttributesFreeIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAttributesIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _onlyIssuers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calculatePaymentETH(
      _attribute: BytesLike,
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculatePaymentToken(
      _attribute: BytesLike,
      _tokenPayment: string,
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAttributes(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAttributesETH(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAttributesETHExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAttributesETHIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAttributesExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _excludedIssuers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAttributesFree(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAttributesFreeExcluding(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _excludedIssuers: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAttributesFreeIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _onlyIssuers: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAttributesIncludingOnly(
      _account: string,
      _tokenId: BigNumberish,
      _attribute: BytesLike,
      _tokenAddr: string,
      _onlyIssuers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}