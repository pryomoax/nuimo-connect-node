[Rocket Nuimo - v1.2.1](../README.md) / DeviceDiscoverySessionOptions

# Interface: DeviceDiscoverySessionOptions

Options given when starting a new discovery session for Nuimo devices

## Table of contents

### Properties

- [deviceIds](devicediscoverysessionoptions.md#deviceids)
- [timeoutMs](devicediscoverysessionoptions.md#timeoutms)

## Properties

### deviceIds

• `Optional` **deviceIds**: `string`[]

List of know device IDs to discover
When specified only those devices white listed will be evented

___

### timeoutMs

• `Optional` **timeoutMs**: `number`

Timeout in milliseconds before auto-stopping discovery
