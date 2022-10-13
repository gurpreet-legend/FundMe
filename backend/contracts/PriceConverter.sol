// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Why is this a library and not abstract?
// Why not an interface?
library PriceConverter {
    // We could make this public, but then we'd have to deploy it
    function getPrice() public view returns (uint256) {
        // Goerli ETH / USD Address
        // https://docs.chain.link/docs/ethereum-addresses/
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        // ETH/USD rate in 18 digit
        return uint256(price / 1e8); // 10 ** 8 == 100000000
    }

    function convertToUsd(uint256 weiAmount)
        public
        view
        returns (uint256)
    {
        uint256 ethPrice  = getPrice();
        uint256 weiAmountInUsd = ( ethPrice * weiAmount ) /1e18; // 10 ** 18 == 1000000000000000000
        return weiAmountInUsd;
    }
}