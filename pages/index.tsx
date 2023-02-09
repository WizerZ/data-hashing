import Head from "next/head";
import sha256 from "crypto-js/sha256";
import md5 from "crypto-js/md5";
import ripemd160 from "crypto-js/ripemd160";
import { keccak512 } from "js-sha3";
import { useEffect, useState } from "react";
import aes from "crypto-js/aes";
import nodeRsa from "node-rsa";


export default function Home() {
  const [sha256Hash, setSha256Hash] = useState<string>("");
  const [md5Hash, setMd5Hash] = useState<string>("");
  const [ripemd160Hash, setRipemd160Hash] = useState<string>("");
  const [keccak512Hash, setKeccak512Hash] = useState<string>("");
  const [aesEncryption, setAesEncryption] = useState<string>("");
  const [dataToEncryptAES, setDataToEncryptAES] = useState<string>("");
  const [privateKeyAES, setPrivateKeyAES] = useState<string>("");
  //const [rsaEncryption, setRsaEncryption] = useState<any>("");
  //const [dataToEncryptRSA, setDataToEncryptRSA] = useState<string>("");
  //const [privateKeyRSA, setPrivateKeyRSA] = useState<string>("");
  //const [publicKeyRSA, setPublicKeyRSA] = useState<string>("");
  const [crypt, setCrypt] = useState<string>("Encrypt");
  const [aesDecrypt, setAesDecrypt] = useState<string>("");

  const toKeccak512 = (string: string) => {
    if (string == "") {
      setKeccak512Hash("");
      return;
    }
    setKeccak512Hash(keccak512(string).toString());
  };

  const toRipemd160 = (string: string) => {
    if (string == "") {
      setRipemd160Hash("");
      return;
    }
    setRipemd160Hash(ripemd160(string).toString());
  };

  const toMd5 = (string: string) => {
    if (string == "") {
      setMd5Hash("");
      return;
    }
    setMd5Hash(md5(string).toString());
  };

  const toSha256 = (string: string) => {
    if (string == "") {
      setSha256Hash("");
      return;
    }
    setSha256Hash(sha256(string).toString());
  };

  const hashText = (string: string) => {
    toMd5(string);
    toSha256(string);
    toRipemd160(string);
    toKeccak512(string);
  };

  useEffect(() => {
    toAes();
  }, [dataToEncryptAES, privateKeyAES]);

  const toAes = () => {
    if (dataToEncryptAES == "" || privateKeyAES == "") {
      setAesEncryption("");
      return;
    }
    setAesEncryption(aes.encrypt(dataToEncryptAES, privateKeyAES).toString());
    setAesDecrypt(aes.encrypt(dataToEncryptAES, privateKeyAES).toString());
  };

  // useEffect(() => {
  //   toRsa();
  // }, [dataToEncryptRSA, privateKeyRSA, publicKeyRSA]);

  // const toRsa = () => {
  //   if (dataToEncryptRSA == "" || privateKeyRSA == "" || publicKeyRSA == "") {
  //     setRsaEncryption("");
  //     return;
  //   }
  //   const key = new nodeRsa();
  //   key.importKey(privateKeyRSA, "pkcs8-private-pem");
  //   key.importKey(publicKeyRSA, "pkcs8-public-pem");
  //   setRsaEncryption(key.encrypt(dataToEncryptRSA, "base64"));
  // };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Data-Hashing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black w-full h-screen p-4">
        <div>
          <p className="text-white text-xl mb-4">Hash data :</p>
          <div className="flex">
            <a className="text-white text-base">Data to hash: </a>
            <input
              className="w-[350px] p-3 ml-5 h-7 text-base text-white bg-gray-800 rounded-xl "
              type="text"
              id="hash"
              onChange={(e) => hashText(e.target.value)}
            />
            <p className="mx-2 text-white text-base">or</p>
            <input className="text-white" type="file"></input>
          </div>
          <p className="text-white text-base mt-3">MD5 : {md5Hash}</p>
          <p className="text-white text-base mt-3">
            Ripemd160 : {ripemd160Hash}
          </p>
          <p className="text-white text-base mt-3">Sha256 : {sha256Hash}</p>
          <p className="text-white text-base mt-3">
            Keccak512 : {keccak512Hash}
          </p>
        </div>
        <div>
          <p className="text-white text-xl mb-4 mt-14">
          <select onChange={(e) => setCrypt(e.target.value)} className="bg-black text-xl">
            <option value="Encrypt">Encrypt</option>
            <option value="Decrypt">Decrypt</option>
          </select>
            data with AES:
          </p>
          <div className="flex">
            <div>
              <a className="text-white text-base">Data to {crypt}: </a>
              <input
                className="w-[350px] p-3 ml-5 h-7 text-base text-white bg-gray-800 rounded-xl "
                type="text"
                id="encrypt"
                onChange={(e) => setDataToEncryptAES(e.target.value)}
                value={dataToEncryptAES}
              />
              <a className="text-white text-base ml-4">Private key: </a>
              <input
                className="w-[350px] p-3 ml-5 h-7 text-base text-white bg-gray-800 rounded-xl "
                type="text"
                id="key"
                onChange={(e) => setPrivateKeyAES(e.target.value)}
                value={privateKeyAES}
              />
            </div>
          </div>
          <p className="text-white text-base mt-3">AES : {aesDecrypt}</p>
        </div>
        {/* <div>
          <p className="text-white text-xl mb-4 mt-14">
            Encrypt data with RSA:
          </p>
          <div className="flex">
            <div>
              <a className="text-white text-base">Data to encrypt: </a>
              <input
                className="w-[350px] p-3 ml-5 h-7 text-base text-white bg-gray-800 rounded-xl "
                type="text"
                id="encrypt"
                onChange={(e) => setDataToEncryptRSA(e.target.value)}
                value={dataToEncryptRSA}
              />
              <a className="text-white text-base ml-4">Public key: </a>
              <input
                className="w-[350px] p-3 ml-5 h-7 text-base text-white bg-gray-800 rounded-xl "
                type="text"
                id="key"
                onChange={(e) => setPublicKeyRSA(e.target.value)}
                value={publicKeyRSA}
              />
              <a className="text-white text-base ml-4">Private key: </a>
              <input
                className="w-[350px] p-3 ml-5 h-7 text-base text-white bg-gray-800 rounded-xl "
                type="text"
                id="key"
                onChange={(e) => setPrivateKeyRSA(e.target.value)}
                value={privateKeyRSA}
              />
            </div>
          </div>
          <p className="text-white text-base mt-3">RSA : {rsaEncryption}</p>
        </div> */}
      </main>
    </>
  );
}
