// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract TokenSales {
    ERC721Full public nftAddress;

    mapping (uint32=>uint256) public tokenPrice; //tokenId(studentId)를 입력하면 얼마의 가격인지 알려주는 매핑

    constructor(address _tokenAddress) public {
        nftAddress = ERC721Full(_tokenAddress);
    }

    function setForSale(uint32 _tokenId, uint256 _price) public {
        address tokenOwner = nftAddress.ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "not token owner");
        require(_price>0, "msg.value is lower than price");
        require(nftAddress.isApprovedForAll(tokenOwner, address(this)), "this contract not permitted.");
        tokenPrice[_tokenId] = _price;
    }

    function purchaseToken(uint32 _tokenId) public payable {
        uint256 price = tokenPrice[_tokenId];
        address tokenSeller = nftAddress.ownerOf(_tokenId);
        require(msg.value >= price, "msg.value<=price");
        require(msg.sender!=tokenSeller, "caller is seller");

        address payable payableTokenSeller = address(uint160(tokenSeller));
        // payable 타입으로 변환
        payableTokenSeller.transfer(msg.value);
        nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId);
        tokenPrice[_tokenId]=0;

    }

    function removeTokenOnSale(uint32 _tokenId) public {
        address tokenSeller = nftAddress.ownerOf(_tokenId);
        require(msg.sender == tokenSeller, "caller is not seller");
        tokenPrice[_tokenId] = 0;
    }
}