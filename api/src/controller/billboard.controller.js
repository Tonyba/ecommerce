import { Billboard } from "../models/BillBoard.js";
import { Store } from "../models/Store.js";

import { isNumeric } from "../helpers/functions.js";

export const createBillboard = async (req, res) => {
  try {
    const { label, imageUrl, StoreId, userId } = req.body;

    const exist = await Billboard.findOne({
      where: {
        label,
        StoreId,
      },
    });

    if (exist)
      return res.status(400).json({ message: "Billboard already exists" });

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });
    if (!label) return res.status(400).json({ message: "Label is required" });
    if (!imageUrl)
      return res.status(400).json({ message: "Image URL is required" });
    if (!StoreId)
      return res.status(400).json({ message: "Store ID is required" });

    const storeUser = await Store.findOne({
      where: {
        id: StoreId,
        userId,
      },
    });

    if (!storeUser) return res.status(401).json({ message: "Unauthorized" });

    const billboard = await Billboard.create({
      label,
      imageUrl,
      StoreId,
    });

    return res.status(200).json({ message: "Billboard created!", billboard });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[BILLBOARDS_POST] Something went wrong" });
  }
};

export const getBillboard = async (req, res) => {
  try {
    const { id } = req.params;
    const { storeId } = req.query;

    if (!isNumeric(id)) return res.json(null);
    if (!id) return res.json(400).json({ message: "Billboard ID is required" });
    if (!storeId)
      return res.json(400).json({ message: "Store ID is required" });

    const store = await Billboard.findOne({
      where: {
        id,
        StoreId: storeId,
      },
    });

    res.status(200).json(store);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[BILLBOARD_GET] Something went wrong" });
  }
};

export const getBillboards = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) return res.json(null);

    const billboards = await Billboard.findAll({
      where: {
        StoreId: storeId,
      },
    });

    res.status(200).json(billboards);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[BILLBOARD_GET] Something went wrong" });
  }
};

export const updateBillBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, imageUrl, StoreId, userId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });

    if (!id) return res.status(400).json({ message: "ID is required" });
    if (!label) return res.status(400).json({ message: "Label is required" });
    if (!imageUrl)
      return res.status(400).json({ message: "Image URL is required" });
    if (!StoreId)
      return res.status(400).json({ message: "Store Id is required" });

    const billboard = await Billboard.findOne({
      where: {
        id,
        StoreId,
      },
    });

    if (!billboard)
      return res.status(404).json({ message: "billboard does not exist" });

    const storeUser = await Store.findOne({
      where: {
        id: StoreId,
        userId,
      },
    });

    if (!storeUser) res.status(401).json({ message: "Unauthorized" });

    const updateStore = await Billboard.update(
      { label, imageUrl },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json(updateStore);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[BILLBOARDS_PUT] Something went wrong" });
  }
};

export const deleteBillboard = async (req, res) => {
  try {
    const { id } = req.params;
    const { storeId, userId } = req.query;

    if (!id)
      return res.status(400).json({ message: "Billboard Id is required" });
    if (!storeId)
      return res.status(400).json({ message: "Store ID is required" });

    const billboard = await Billboard.findOne({
      where: {
        id,
        StoreId: storeId,
      },
    });

    if (!billboard)
      return res.status(404).json({ message: "billboard not found" });

    const storeUser = await Store.findOne({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUser) res.status(401).json({ message: "Unauthorized" });

    await Billboard.destroy({
      where: {
        id,
      },
      forced: true,
    });

    return res.status(200).json({ message: "billboard deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[BILLBOARDS_DELETE] Something went wrong" });
  }
};
