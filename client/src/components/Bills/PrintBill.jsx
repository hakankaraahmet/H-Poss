import React, { useRef } from "react";
import { Modal, Button } from "antd";
import { useReactToPrint } from "react-to-print";
const PrintBill = ({ customer, isModalOpen, setIsModalOpen }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      title="Print Bill"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">H-POS</h2>
            </div>
            <div className="bill-details">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-12">
                <div className="text-sm text-slate-500">
                  <p className="font-bold">Bill Detail:</p>
                  <p className="font-bold text-green-700">{customer?.customerName}</p>
                  <p>Fake Street 123</p>
                  <p>San Javier</p>
                  <p>CA 1234</p>
                </div>
                <div className="text-sm text-slate-500">
                  <p className="font-bold">Bill:</p>
                  <p>Boring Compant</p>
                  <p>Fake Street 123</p>
                  <p>San Javier</p>
                  <p>CA 1234</p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-sm text-slate-500">
                    <p className="font-bold">Bill Number:</p>
                    <p>{customer._id?.slice(0, 5)}</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p className="font-bold">Date of Issue:</p>
                    <p>{customer.createdAt?.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-sm text-slate-500 sm:block hidden">
                    <p className="font-bold">Terms:</p>
                    <p>0 Days</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p className="font-bold">Due:</p>
                    <p>00.00.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py3.5 ml-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="py3.5 ml-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell "
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py3.5 ml-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py3.5 ml-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Piece
                    </th>
                    <th
                      scope="col"
                      colSpan={"4"}
                      className="py3.5 ml-4  text-end text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell "
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer.cartItems?.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-t border-slate-200"
                    >
                      <td className="py-4 pr-3 hidden sm:table-cell">
                        <img
                          className="w-12 h-12 object-contain"
                          src={item.img}
                          alt={item.title}
                        />
                      </td>
                      <td className="py-4 pr-3 flex flex-col">
                        <span className="text-slate-700 font-semibold">
                          {item.title}
                        </span>
                        <span className="text-slate-700 font-light inline-block text-xs sm:hidden">
                          Unit Price {item.price.toFixed(2)}$
                        </span>
                      </td>
                      <td className="py-4 pr-3 text-center  hidden sm:table-cell">
                        {item.price.toFixed(2)}$
                      </td>
                      <td className="py-4 pr-3 text-center  hidden sm:table-cell">
                        {item.quantity}
                      </td>
                      <td colSpan={"4"} className="py-4  text-end ">
                        {(item.price * item.quantity).toFixed(2)}$
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="">
                    <th
                      className="text-left sm:text-right font-normal pt-4  pr-3 table-cell"
                      colSpan={"4"}
                      scope="row"
                    >
                      Sub Total
                    </th>
                    <th className="text-right font-normal pt-4  " scope="row">
                      {customer.subTotal}$
                    </th>
                  </tr>
                  <tr className="">
                    <th
                      className="text-left sm:text-right font-normal pt-4  pr-3 "
                      colSpan={"4"}
                      scope="row"
                    >
                      VAT
                    </th>
                    <th
                      className="text-right font-normal text-red-600 pt-4  "
                      scope="row"
                    >
                      +{customer.tax}$
                    </th>
                  </tr>
                  <tr className="">
                    <th
                      className="text-left sm:text-right pt-4  pr-3 uppercase"
                      colSpan={"4"}
                      scope="row"
                    >
                      Total
                    </th>
                    <th className="text-right pt-4  " scope="row">
                      {customer.totalAmountT}$
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    We offer refund and/or exchange within the first 30 days of
                    your purchase, if 30 days have passed since your purchase,
                    you will not be offered a refund and/or exchange of any
                    kind.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
