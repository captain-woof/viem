import { Requests } from '../types/eip1193'
import { buildRequest } from '../utils/buildRequest'
import { uid } from '../utils/uid'
import { Adapter, BaseRpcRequests } from './adapters/createAdapter'

export type Client<
  TAdapter extends Adapter = Adapter,
  TRequests extends BaseRpcRequests = Requests,
> = {
  /** The RPC adapter (http, webSocket, injected, etc) */
  adapter: TAdapter['config'] & TAdapter['value']
  /** A key for the client. */
  key: string
  /** A name for the client. */
  name: string
  /** Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. */
  pollingInterval: number
  /** Request function wrapped with friendly error handling */
  request: TRequests['request']
  /** The type of client. */
  type: string
  /** A unique ID for the client. */
  uid: string
}

export type ClientConfig<
  TAdapter extends Adapter = Adapter,
  TRequests extends BaseRpcRequests = Requests,
> = Partial<
  Pick<Client<TAdapter, TRequests>, 'key' | 'name' | 'pollingInterval' | 'type'>
>

/**
 * @description Creates a base RPC client with the given adapter.
 *
 * - Intended to be used as a base for other RPC clients.
 * - Has access to _all_ EIP-1474 RPC methods.
 *
 * @example
 * import { mainnet } from 'viem/chains'
 * import { createClient, http } from 'viem/clients'
 * const client = createClient(http({ chain: mainnet }))
 */
export function createClient<
  TAdapter extends Adapter,
  TRequests extends BaseRpcRequests,
>(
  adapter: TAdapter,
  {
    key = 'base',
    name = 'Base Client',
    pollingInterval = 4_000,
    type = 'base',
  }: ClientConfig<TAdapter, TRequests> = {},
): Client<TAdapter, TRequests> {
  const { config, value } = adapter
  return {
    adapter: { ...config, ...value },
    key,
    name,
    pollingInterval,
    request: buildRequest(config.request),
    type,
    uid: uid(),
  }
}