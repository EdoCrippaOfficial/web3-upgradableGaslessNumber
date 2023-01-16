// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Number.sol";

contract NumberV2 is Number {

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(MinimalForwarderUpgradeable forwarder)
    Number(address(forwarder))
    {}

    function version() public pure virtual returns (string memory) {
        return "2.0.0";
    }

    /// Increments the stored value by 1
    function increment() public {
        store(retrieve()+1);
    }


}
