// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract RandomNumber is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 subId;

    //存放得到的 requestId 和 随机数
    uint256 public requestId;
    uint256 public randomWords;

    address vrfCoordinator = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;
    bytes32 keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
    uint16 requestConfirmations = 3;
    uint32 callbackGasLimit = 200_000;
    uint32 numWords = 1;
    
    constructor(uint64 s_subId) VRFConsumerBaseV2(vrfCoordinator){
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        subId = s_subId;
    }

    function requestRandomWords() external {
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            subId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(uint256 /* requestId*/, uint256[] memory s_randomWords) internal override {
        randomWords = (s_randomWords[0] % 20) + 1;
    }
}

// 21551911340158057448009881726632733727119365174926938558663926322978327819470
// 65849575437776078572005560464159494423445388692615433578391754748010582131096
// 114645011131352116464290462405707675396597177638353541621221673133210596807286
// 67906936708484362961627655133353325884113020604902880577128787375467878013064
// 51704931235380775035680878405086864104585802653836659643992263919380860769069