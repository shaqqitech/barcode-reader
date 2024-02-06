"use client";
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { BiErrorCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';
import Image from "next/image";
import React, { useState } from "react";

const BarCodeInfo = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBarcode(e.target.value);
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );
      setProduct(res.data.product);
      setError(null); // Clear any previous errors
      setBarcode('')
    } catch (error) {
      setError("Error getting data. Please try again.");
      console.log("Error getting data: ", error);
    }
  };

  return (
    <motion.main 
      className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 p-5 bg-gray-900 rounded-2xl mx-auto scrollbar-hide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex justify-center items-center flex-col space-y-4">
        <label htmlFor="text" className="text-white font-semibold text-lg">
          Enter Product Barcode:
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            id="text"
            value={barcode}
            onChange={handleChange}
            className="w-full sm:w-auto outline-none ring-2 focus:ring-4 text-black rounded-xl px-3 py-1"
            placeholder="Enter the Barcode"
          />
          <button
            onClick={getData}
            className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold flex items-center space-x-2"
          >
            <FiSearch />
          </button>
        </div>
        {error && (
          <div className="flex items-center space-x-2 bg-red-500 text-white rounded-lg p-2">
            <BiErrorCircle />
            <p>{error}</p>
          </div>
        )}
        {product && (
          <motion.div 
            className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="w-full sm:w-1/2 flex justify-center items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Image
                src={product.image_url}
                alt="Product Image"
                width={400}
                height={400}
                className="rounded-xl"
              />
            </motion.div>
            <motion.div 
              className="w-full sm:w-1/2 flex flex-col justify-center items-center text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="font-semibold text-xl mb-2">Product Information</h2>
              <motion.div 
                className="w-full flex flex-col space-y-4 "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <InfoItem label="Code" value={product.code} />
                <InfoItem label="Name" value={product.product_name} />
                <InfoItem label="Country of Origin" value={product.countries_tags} />
                <InfoItem label="Energy" value={`${product.nutriments?.energy} kg`} />
                <InfoItem label="Brand Owner" value={product.brand_owner} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="w-full bg-gray-800 rounded-xl p-4">
    <p className="text-gray-400">{label}</p>
    <p className="text-white mt-1">{value}</p>
  </div>
);

export default BarCodeInfo;
