import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, genericTx } from '../test.fixture';
import { ethers } from "ethers";

// StakeDAO USD Vault on polygon
const NETWORK = "polygon";
const contractAddr = "0x7d60f21072b585351dfd5e8b17109458d97ec120";
const BASE_SCREENS_S = (1 + 1 + 1 + 1 + 3 + 1 + 1 + 1); // STAKEDAO + STRATEGY + WANT + AMOUNT +  STRATEGY ADDRESS (3) + NETWORK + GAS_FEES + ACCEPT
const BASE_SCREENS_X = (1 + 1 + 1 + 1 + 1 + 1 + 1 + 1); // STAKEDAO + STRATEGY + WANT + AMOUNT +  STRATEGY ADDRESS (3) + NETWORK + GAS_FEES + ACCEPT

test('[Nano S] Deposit All Tokens into vault', zemu("nanos", async (sim, eth) => {
  const contract = new ethers.Contract(contractAddr, ['function depositAll()']);
  const {data} = await contract.populateTransaction.depositAll();
  let unsignedTx = genericTx;
  unsignedTx.to = contractAddr;
  unsignedTx.data = data;
  unsignedTx.chainId = 137;

  const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);
  const tx = eth.signTransaction("44'/60'/0'/0", serializedTx);

  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_vault_deposit_all_pol', [BASE_SCREENS_S, 0]);
  await tx;
}, NETWORK));

test('[Nano X] Deposit All Tokens into vault', zemu("nanox", async (sim, eth) => {
  const contract = new ethers.Contract(contractAddr, ['function depositAll()']);
  const {data} = await contract.populateTransaction.depositAll();
  let unsignedTx = genericTx;
  unsignedTx.to = contractAddr;
  unsignedTx.data = data;
  unsignedTx.chainId = 137;

  const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);
  const tx = eth.signTransaction("44'/60'/0'/0", serializedTx);

  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanox_vault_deposit_all_pol', [BASE_SCREENS_X, 0]);
  await tx;
}, NETWORK));
