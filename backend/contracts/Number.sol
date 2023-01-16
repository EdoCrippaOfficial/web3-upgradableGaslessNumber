// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol";

contract Number is ERC2771ContextUpgradeable {

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(address forwarder)
    ERC2771ContextUpgradeable(forwarder)
    {}

    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    function initialize(uint256 newValue) public initializer {
        store(newValue);
    }

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
