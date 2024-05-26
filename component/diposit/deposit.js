import React, { useState } from "react";
import { Button, Input, Modal, Popover, QRCode, Tooltip, message } from "antd";
import { FaCopy } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";

const Deposit = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [address, setAddress] = useState("");
  const { data: session } = useSession();

  const showModal = (e) => {
    setCurrency(e.currency);
    setAddress(e.address);
    setOpen(true);
  };

  const handleCopy = (e) => {
    global.navigator.clipboard.writeText(e);
    message.success("Copied to clipboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const trxid = e.target.trxid.value;
    const amount = e.target.amount.value;
    const email = session.user.email;
    const userName = session.user.name;
    const userId = session.user.id;
    const provider = currency;

    const data = { email, trxid, amount, provider, userName, userId };

    await axios
      .post("https://api3.adbacklist.com/api/deposit", data)
      .then((response) => {
        if (response.data.status == "success") {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title:
              "Your deposit will be verified and credit will be added to your wallet.",
            showConfirmButton: false,
            timer: 2500,
          }).then(
            setTimeout(() => {
              router.reload();
            }, 500)
          );
        }
      });
  };

  return (
    <div>
      <div className="bg-white p-3 sm:w-[800px] m-auto my-10">
        <h1 className="text-2xl p-3 font-bold text-green-500">
          Choose Diposit Option
        </h1>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-5  ">
          <div
            className="border-2"
            onClick={() =>
              showModal({
                currency: "BTC",
                address: "1AiPH2VyJ6JyUXUfPBHg7hqz2XDRLTiD89",
              })
            }
          >
            <img
              className="w-[100px] h-[100px] m-auto"
              src="/currency/btc.png"
            />
            <h2 className="text-center text-black">BTC</h2>
          </div>
          <div
            className="border-2"
            onClick={() =>
              showModal({
                currency: "USDT",
                address: "TP3xGcnf29NxJiKDpDDEw3dn8eDz3nwNid",
              })
            }
          >
            <img
              className="w-[100px] h-[100px] m-auto"
              src="/currency/usdt.png"
            />
            <h2 className="text-center text-black">USDT</h2>
          </div>
          <div
            className="border-2"
            onClick={() =>
              showModal({
                currency: "LTC",
                address: "LW5MBAv7RwkzBtR4xRpSSRLkEZJzFwf2pr",
              })
            }
          >
            <img
              className="w-[100px] h-[100px] m-auto"
              src="/currency/ltc.png"
            />
            <h2 className="text-center text-black">LTC</h2>
          </div>
          <div
            className="border-2"
            onClick={() =>
              showModal({
                currency: "DOGE",
                address: "DLEuuZNKUYrzJSEsHoYY4BvfkaUBzFcSp3",
              })
            }
          >
            <img
              className="w-[100px] h-[100px] m-auto"
              src="/currency/doge.svg"
            />
            <h2 className="text-center text-black">DOGE</h2>
          </div>
          <div
            className="border-2"
            onClick={() =>
              showModal({
                currency: "ETH",
                address: "0xaff02721266f38707d4d5864cb232be356d7b7fb",
              })
            }
          >
            <img
              className="w-[100px] h-[100px] m-auto"
              src="/currency/eth.png"
            />
            <h2 className="text-center text-black">ETH</h2>
          </div>
          <div
            className="border-2"
            onClick={() =>
              showModal({
                currency: "TRX",
                address: "TP3xGcnf29NxJiKDpDDEw3dn8eDz3nwNid",
              })
            }
          >
            <img
              className="w-[100px] h-[100px] m-auto"
              src="/currency/trx.png"
            />
            <h2 className="text-center text-black">TRX</h2>
          </div>
        </div>
        <Modal
          title={`Deposit ${currency}`}
          open={open}
          onCancel={() => setOpen(false)}
          okButtonProps={{
            hidden: true,
          }}
          cancelButtonProps={{
            hidden: true,
          }}
        >
          <div className="m-auto bg-gray-200 p-2">
            <p className="flex gap-2 items-center justify-center">
              {address}
              <Tooltip title="copy">
                <div onClick={() => handleCopy(`${address}`)}>
                  {" "}
                  <FaCopy className="text-xl cursor-pointer" />
                </div>
              </Tooltip>
            </p>
            <QRCode className="m-auto" value={address} />
          </div>
          <hr className="my-5" />
          <small>
            After completing the payment, please send us the transaction ID and
            the amount you have sent.
          </small>
          <hr className="my-5" />
          <form onSubmit={handleSubmit}>
            <label>Transaction ID</label>
            <input
              name="trxid"
              placeholder="Transaction ID"
              className="bg-gray-100 w-full mb-3"
            />

            <label className="pt-5">Amount</label>
            <input
              name="amount"
              placeholder="Amount you added"
              className="bg-gray-100 w-full"
            />
            {loading ? (
              <button
                disabled
                className="mt-3 border border-green-500 rounded-lg px-3 text-lg text-white bg-green-500 hover:bg-white hover:text-green-500 font-bold cursor-not-allowed"
              >
                loading
              </button>
            ) : (
              <button
                type="submit"
                className="mt-3 border border-green-500 rounded-lg px-3 text-lg text-white bg-green-500 hover:bg-white hover:text-green-500 font-bold "
              >
                Submit
              </button>
            )}
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Deposit;
