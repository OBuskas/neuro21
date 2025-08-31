// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ADHD Token
 * @dev ERC-20 token for Neuro21 mental health platform on Base
 * @notice This contract implements the $ADHD token with reward mechanisms
 */
contract ADHDToken is ERC20, Ownable {
    // Events
    event RewardMinted(address indexed user, uint256 amount, string activity);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    // Constants
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18; // 100M tokens
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18; // 1M tokens for initial distribution

    // Mappings
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public lastActivity;
    mapping(address => uint256) public totalEarned;

    // Activity reward multipliers (basis points)
    uint256 public constant EXERCISE_REWARD = 1000; // 10 tokens per exercise activity
    uint256 public constant NUTRITION_REWARD = 800;  // 8 tokens per nutrition activity
    uint256 public constant SLEEP_REWARD = 600;     // 6 tokens per sleep activity
    uint256 public constant STREAK_BONUS = 500;     // 5 tokens bonus for streaks

    /**
     * @dev Constructor - mints initial supply to contract owner
     */
    constructor(address initialOwner)
        ERC20("ADHD Token", "ADHD")
        Ownable(initialOwner)
    {
        _mint(initialOwner, INITIAL_SUPPLY);
    }

    /**
     * @dev Mint reward tokens for user activities
     * @param user Address of the user to reward
     * @param activity Type of activity performed
     * @param score User's self-reported score (0-10)
     */
    function mintReward(
        address user,
        string memory activity,
        uint256 score
    ) external onlyOwner {
        require(score >= 0 && score <= 10, "Score must be between 0 and 10");
        require(user != address(0), "Invalid user address");

        uint256 baseReward = _calculateBaseReward(activity);
        uint256 scoreMultiplier = score * 100; // Convert to basis points
        uint256 totalReward = (baseReward * scoreMultiplier) / 1000; // Apply score multiplier

        // Add streak bonus if applicable
        if (_checkStreakBonus(user)) {
            totalReward += STREAK_BONUS;
        }

        require(totalSupply() + totalReward <= MAX_SUPPLY, "Would exceed max supply");

        _mint(user, totalReward);
        totalEarned[user] += totalReward;
        lastActivity[user] = block.timestamp;

        emit RewardMinted(user, totalReward, activity);
    }

    /**
     * @dev Stake tokens to earn premium benefits
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;

        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Unstake tokens
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 amount) external {
        require(amount > 0, "Cannot unstake 0 tokens");
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");

        stakedBalance[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Get user's staked balance
     * @param user Address of the user
     */
    function getStakedBalance(address user) external view returns (uint256) {
        return stakedBalance[user];
    }

    /**
     * @dev Get user's total earned tokens
     * @param user Address of the user
     */
    function getTotalEarned(address user) external view returns (uint256) {
        return totalEarned[user];
    }

    /**
     * @dev Check if user qualifies for streak bonus
     * @param user Address of the user
     */
    function _checkStreakBonus(address user) internal view returns (bool) {
        // Simple streak check - can be enhanced with more complex logic
        return (block.timestamp - lastActivity[user]) < 2 days;
    }

    /**
     * @dev Calculate base reward for activity type
     * @param activity Type of activity
     */
    function _calculateBaseReward(string memory activity) internal pure returns (uint256) {
        bytes32 activityHash = keccak256(abi.encodePacked(activity));

        if (activityHash == keccak256(abi.encodePacked("exercise"))) {
            return EXERCISE_REWARD;
        } else if (activityHash == keccak256(abi.encodePacked("nutrition"))) {
            return NUTRITION_REWARD;
        } else if (activityHash == keccak256(abi.encodePacked("sleep"))) {
            return SLEEP_REWARD;
        } else {
            return 500; // Default reward for other activities
        }
    }

    /**
     * @dev Override decimals to 18 for better precision
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
