import { Billboard } from "../models/BillBoard.js";
import { isNumeric } from "../helpers/functions.js";

export const createBillboard = async (req, res) => {
  try {
    const { label, imageUrl, StoreId } = req.body;

    const exist = await Billboard.findOne({
      where: {
        label,
        StoreId,
      },
    });

    if (exist)
      return res.status(400).json({ message: "Billboard already exists" });

    const createBillboard = await Billboard.create({
      label,
      imageUrl,
      StoreId,
    });

    return res
      .status(200)
      .json({ message: "Billboard created!", billboard: createBillboard });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[BILLBOARD_POST] Something went wrong" });
  }
};

export const getBillboard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isNumeric(id)) return res.json(null);

    const store = await Billboard.findByPk(id);

    res.status(200).json(store);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[BILLBOARD_POST] Something went wrong" });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, imageUrl, billboardId } = req.body;

    if (!id) return res.status(400).json({ message: "id is required" });
    if (!label || !imageUrl)
      return res
        .status(400)
        .json({ message: "label and background image are required" });

    const store = await Billboard.findOne({
      where: {
        id,
        StoreId,
      },
    });

    if (!store)
      return res.status(404).json({ message: "billboard does not exist" });

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

export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "id is required" });

    const billboard = await Billboard.findOne({
      where: {
        id,
      },
    });

    if (!billboard)
      return res.status(404).json({ message: "billboard not found" });

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
