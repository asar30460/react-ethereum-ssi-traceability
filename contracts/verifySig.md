## 簽署訊息

**INPUT:** EOA address(_account_), Message(_msg_)  
**OUTPUT:** Signature(_sig_)  
**function** sign  
&emsp;&emsp;_hashMsg_ = keccak256(_msg_) // a built-in hash function  
&emsp;&emsp;_sig_ = personal*sign(\_account*, _hashMsg_)  
&emsp;&emsp;**return** _sig_  
**end function**

## 驗證簽章

**INPUT:** Signer address(_signer_), Message(_msg_), Signature(_sig_),  
&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethereum sign prefix(_ethSigPrefix_)  
**OUTPUT:** A boolean value  
**function** verify  
&emsp;&emsp;_msgHash_ = getMessageHash(_msg_)  
&emsp;&emsp;_ethSigMsgHash_ = keccak256(encode[_msgHash_, _ethSigPrefix_])  
&emsp;&emsp;_res_ = recover(_ethSigMsgHash_, _sig_)  
&emsp;&emsp;**if** _res_ == _signer_  
&emsp;&emsp;&emsp;&emsp;**then return** true  
&emsp;&emsp;**return** false  
**end function**

## Recover

**INPUT:** Ethereum signed message(_ethSigMsgHash_), Signature(_sig_)  
**OUTPUT:** address  
**function** recover  
&emsp;&emsp;// "mload" means load from memory  
&emsp;&emsp;_r_ = mload(add(_sig_, 32)) // skip first 32 bytes since it stores length  
&emsp;&emsp;_s_ = mload(add(_sig_, 64)) // skip first 64 bytes  
&emsp;&emsp;_v_ = byte(0, mload(add(_sig_, 96))) // only get the first byte "96"  
&emsp;&emsp;_recoveredSigner_ = ecrecover(_ethSigMsgHash_, _v_, _r_, _s_)  
&emsp;&emsp;**return** _recoveredSigner_  
**end function**
