// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Neuro21 Achievements NFT
 * @dev ERC-721 token for Neuro21 mental health achievements
 * @notice This contract mints unique NFTs for user accomplishments
 */
contract Neuro21Achievements is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Achievement types
    enum AchievementType {
        FIRST_STEP,      // Complete first activity
        WEEK_WARRIOR,    // 7 days streak
        MONTH_MASTER,    // 30 days streak
        HEALTH_HERO,     // 100 activities completed
        STREAK_CHAMPION, // 50 days streak
        WELLNESS_WARRIOR // All categories mastered
    }

    struct Achievement {
        AchievementType achievementType;
        string name;
        string description;
        string imageURI;
        uint256 rarity; // 1-5 stars
        uint256 unlockCriteria; // What triggers this achievement
    }

    // Mapping from token ID to achievement details
    mapping(uint256 => Achievement) public achievements;

    // Mapping from user address to their achievements
    mapping(address => AchievementType[]) public userAchievements;

    // Mapping to check if user has specific achievement
    mapping(address => mapping(AchievementType => bool)) public hasAchievement;

    // Achievement definitions
    Achievement[] public achievementTemplates;

    // Events
    event AchievementUnlocked(address indexed user, AchievementType achievementType, uint256 tokenId);
    event AchievementMinted(address indexed user, uint256 tokenId);

    constructor(address initialOwner)
        ERC721("Neuro21 Achievements", "NEURO")
        Ownable(initialOwner)
    {
        _initializeAchievements();
    }

    /**
     * @dev Initialize achievement templates
     */
    function _initializeAchievements() internal {
        achievementTemplates.push(Achievement({
            achievementType: AchievementType.FIRST_STEP,
            name: "First Step",
            description: "Completed your first mental health activity",
            imageURI: "ipfs://QmFirstStepURI",
            rarity: 1,
            unlockCriteria: 1
        }));

        achievementTemplates.push(Achievement({
            achievementType: AchievementType.WEEK_WARRIOR,
            name: "Week Warrior",
            description: "Maintained a 7-day streak",
            imageURI: "ipfs://QmWeekWarriorURI",
            rarity: 2,
            unlockCriteria: 7
        }));

        achievementTemplates.push(Achievement({
            achievementType: AchievementType.MONTH_MASTER,
            name: "Month Master",
            description: "Achieved a 30-day streak",
            imageURI: "ipfs://QmMonthMasterURI",
            rarity: 3,
            unlockCriteria: 30
        }));

        achievementTemplates.push(Achievement({
            achievementType: AchievementType.HEALTH_HERO,
            name: "Health Hero",
            description: "Completed 100 mental health activities",
            imageURI: "ipfs://QmHealthHeroURI",
            rarity: 4,
            unlockCriteria: 100
        }));

        achievementTemplates.push(Achievement({
            achievementType: AchievementType.STREAK_CHAMPION,
            name: "Streak Champion",
            description: "Maintained a 50-day streak",
            imageURI: "ipfs://QmStreakChampionURI",
            rarity: 5,
            unlockCriteria: 50
        }));

        achievementTemplates.push(Achievement({
            achievementType: AchievementType.WELLNESS_WARRIOR,
            name: "Wellness Warrior",
            description: "Mastered all mental health categories",
            imageURI: "ipfs://QmWellnessWarriorURI",
            rarity: 5,
            unlockCriteria: 1000 // Special criteria
        }));
    }

    /**
     * @dev Mint achievement NFT for user
     * @param user Address of the user
     * @param achievementType Type of achievement
     */
    function mintAchievement(address user, AchievementType achievementType) external onlyOwner {
        require(!hasAchievement[user][achievementType], "Achievement already unlocked");

        // Get achievement template
        Achievement memory template = _getAchievementTemplate(achievementType);

        // Mint NFT
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(user, tokenId);

        // Store achievement details
        achievements[tokenId] = template;
        userAchievements[user].push(achievementType);
        hasAchievement[user][achievementType] = true;

        emit AchievementMinted(user, tokenId);
        emit AchievementUnlocked(user, achievementType, tokenId);
    }

    /**
     * @dev Check if user qualifies for achievement
     * @param user User address
     * @param achievementType Achievement to check
     * @param userStats User's statistics (streak, totalActivities, etc.)
     */
    function checkAchievementEligibility(
        address user,
        AchievementType achievementType,
        uint256 currentStreak,
        uint256 totalActivities
    ) external view returns (bool) {
        if (hasAchievement[user][achievementType]) {
            return false;
        }

        Achievement memory template = _getAchievementTemplate(achievementType);

        if (achievementType == AchievementType.FIRST_STEP) {
            return totalActivities >= template.unlockCriteria;
        } else if (achievementType == AchievementType.WEEK_WARRIOR ||
                   achievementType == AchievementType.MONTH_MASTER ||
                   achievementType == AchievementType.STREAK_CHAMPION) {
            return currentStreak >= template.unlockCriteria;
        } else if (achievementType == AchievementType.HEALTH_HERO) {
            return totalActivities >= template.unlockCriteria;
        } else if (achievementType == AchievementType.WELLNESS_WARRIOR) {
            // Special criteria - implement logic based on categories mastered
            return totalActivities >= template.unlockCriteria;
        }

        return false;
    }

    /**
     * @dev Get user's achievement count
     * @param user User address
     */
    function getUserAchievementCount(address user) external view returns (uint256) {
        return userAchievements[user].length;
    }

    /**
     * @dev Get user's achievements
     * @param user User address
     */
    function getUserAchievements(address user) external view returns (AchievementType[] memory) {
        return userAchievements[user];
    }

    /**
     * @dev Get achievement template
     * @param achievementType Type of achievement
     */
    function _getAchievementTemplate(AchievementType achievementType) internal view returns (Achievement memory) {
        for (uint256 i = 0; i < achievementTemplates.length; i++) {
            if (achievementTemplates[i].achievementType == achievementType) {
                return achievementTemplates[i];
            }
        }
        revert("Achievement template not found");
    }

    /**
     * @dev Get token URI for metadata
     * @param tokenId Token ID
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");

        Achievement memory achievement = achievements[tokenId];

        // Create JSON metadata
        return string(abi.encodePacked(
            "data:application/json;base64,",
            _encodeBase64(abi.encodePacked(
                '{"name":"', achievement.name, '",',
                '"description":"', achievement.description, '",',
                '"image":"', achievement.imageURI, '",',
                '"attributes":[{"trait_type":"Rarity","value":"', _rarityToString(achievement.rarity), '"}]}'
            ))
        ));
    }

    /**
     * @dev Convert rarity number to string
     * @param rarity Rarity level (1-5)
     */
    function _rarityToString(uint256 rarity) internal pure returns (string memory) {
        if (rarity == 1) return "Common";
        if (rarity == 2) return "Uncommon";
        if (rarity == 3) return "Rare";
        if (rarity == 4) return "Epic";
        if (rarity == 5) return "Legendary";
        return "Unknown";
    }

    /**
     * @dev Simple base64 encoding (for demo purposes)
     * In production, use a proper base64 library
     */
    function _encodeBase64(bytes memory data) internal pure returns (string memory) {
        // Simplified base64 for demo - in production use proper library
        return "base64_encoded_metadata_here";
    }

    /**
     * @dev Get total achievements available
     */
    function getTotalAchievements() external view returns (uint256) {
        return achievementTemplates.length;
    }

    /**
     * @dev Get achievement template by index
     */
    function getAchievementTemplate(uint256 index) external view returns (Achievement memory) {
        require(index < achievementTemplates.length, "Index out of bounds");
        return achievementTemplates[index];
    }
}
