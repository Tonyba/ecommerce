import { Store } from "../models/Store.js";
import Cookies from "cookies";
import { sessions } from "@clerk/clerk-sdk-node";

export const createStore = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const { _clerk_session_id } = req.query;

    const cookies = new Cookies(req, res);
    const clientToken = cookies.get("__session");
    const sessionId = _clerk_session_id;

    if (!name) return res.status(400).json({ message: "Name is required" });

    if (!clientToken || !sessionId)
      return res.status(401).json({ message: "Unauthorized" });

    const session = await sessions.verifySession(sessionId, clientToken);

    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const exist = await Store.findOne({
      where: {
        name,
      },
    });

    if (exist) return res.status(400).json({ message: "Store already exists" });

    const createStore = await Store.create({ name, userId });

    return res
      .status(200)
      .json({ message: "Store created!", store: createStore });
  } catch (error) {
    console.log("[STORE_POST]", error);
    res.status(500).json({ message: "Algo salio mal" });
  }
};

export const getStores = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      return res.status(400).json({ message: "User Id is required" });

    const stores = await Store.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json(stores);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getStoreByIdOrUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!id) return res.status(400).json({ message: "id is required" });

    let filters = { id };

    if (userId != "undefined") filters.userId = userId;

    const store = await Store.findOne({
      where: filters,
    });

    return res.status(200).json(store);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getStoreByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      return res.status(400).json({ message: "User Id is required" });

    const store = await Store.findOne({
      where: {
        userId,
      },
    });

    if (!store) return res.status(404).json({ message: "store not found" });

    return res.status(200).json(store);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const { name } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });
    if (!id) return res.status(400).json({ message: "id is required" });
    if (!name) return res.status(400).json({ message: "name is required" });

    const store = await Store.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!store)
      return res.status(404).json({ message: "Store does not exist" });

    const updateStore = await Store.update(
      { name },
      {
        where: {
          id,
          userId,
        },
      }
    );

    return res.status(200).json(updateStore);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[STORES_PUT] Something went wrong" });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });
    if (!id) return res.status(400).json({ message: "id is required" });

    const store = await Store.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!store) return res.status(404).json({ message: "store not found" });

    await Store.destroy({
      where: {
        id,
        userId,
      },
      forced: true,
    });

    return res.status(200).json({ message: "store deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "[STORES_DELETE] Something went wrong" });
  }
};
