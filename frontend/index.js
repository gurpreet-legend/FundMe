import {abi, contractAddress} from "./constants.js"

let connectBtn = document.getElementById("connectBtn")
let fundBtn = document.getElementById("fundBtn")
let withdrawBtn = document.getElementById("withdrawBtn")
let balanceBtn = document.getElementById("balanceBtn")

const connect = async () => {
        if (typeof window.ethereum !== "undefined"){
            try {
                // Connecting to Metamask
                await ethereum.request({ method: "eth_requestAccounts" })
            } catch (error) {
                console.log(error)
            }
            const accounts = await ethereum.request({ method: "eth_accounts" })
            //   console.log(`Wallet address : ${accounts}`)
            connectBtn.innerHTML = `Connected: ${accounts.toString().slice(0, 5)}...`
        } else {
              alert("Please install MetaMask 😓")
        }
}
connectBtn.onclick = connect

// To make function calls from a contract, we need:
// ABI
// Contract address
// provider 
// signer
const withdraw = async () => {
    if (typeof window.ethereum !== "undefined"){
        // onnecting to Ethereum: MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()

        // We can either pass signer or provider
        // Provider: only has read-only access (i.e. constant calls).
        // Signer: can change state of Blockchain( state variables ).
        const  contract = new ethers.Contract(contractAddress, abi, signer)
        
        try {
            const response = await contract.withdraw()
            //  await reponse.wait(1)
        } catch {
            console.log(error)
        }
    
    } else {
        alert("Please install MetaMask 😓")
    }
}
withdrawBtn.onclick = withdraw

const fund = async () => {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()

        // We can either pass signer or provider
        // Provider: only has read-only access (i.e. constant calls).
        // Signer: can change state of Blockchain( state variables ).
        const  contract = new ethers.Contract(contractAddress, abi, signer)
        
        try {
            const response = await contract.fund({
                value: ethers.utils.parseEther("0.01")
            })
            //  await reponse.wait(1)
        } catch {
            console.log(error)
        }
    
    } else {
        alert("Please install MetaMask 😓")
    }
}
fundBtn.onclick = fund

async function getBalance() {
    let balanceText = document.getElementById("balanceText")
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try {
        const balance = await provider.getBalance(contractAddress)
        balanceText.innerHTML = `Balance: ${ethers.utils.formatEther(balance)} ETH`
      } catch (error) {
        console.log(error)
      }
    } else {
        alert("Please install MetaMask 😓")
    }
}
balanceBtn.onclick = getBalance