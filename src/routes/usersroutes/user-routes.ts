import { Request, Response, Router } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface ProductsModel {
  nome?: string;
  categoria?: string | undefined;
  image?: string;
  material?: string;
  descricao?: string;
  departamento?: string;
  imagem?: string;
  preco?: string;
  id?: string | undefined;
}

class UserRoutes {
  router = Router();

  constructor() {
    this.products();
    this.findProducts();
  }

  products() {
    this.router.get("/", async (req: Request, res: Response) => {
      let { data: brazilian } = await axios.get(process.env.BRAZILIAN_API);
      let { data: european } = await axios.get(process.env.BRAZILIAN_API);

      const allProducts = [brazilian, european];

      return res.json(allProducts);
    });
  }

  async allProducts() {
    let { data: brazilian } = await axios.get(process.env.BRAZILIAN_API);
    let { data: european } = await axios.get(process.env.BRAZILIAN_API);

    const fetchProdutos = await Promise.all([brazilian, european]);
    const allProducts: ProductsModel[] = [];

    fetchProdutos[0].forEach((values: ProductsModel) => {
      allProducts.push(values);
    });
    fetchProdutos[1].forEach((values: ProductsModel) => {
      allProducts.push(values);
    });

    return allProducts;
  }

  findProducts() {
    this.router.get("/findproducts", async (req: Request, res: Response) => {
      console.log("aoi");
      const foundProducts: ProductsModel[] = [];
      const data = await this.allProducts();

      const idItems: any = req.query.idItems;
      console.log(idItems);

      for (let i = 0; i < idItems.length; i++) {
        if (idItems[i] !== data[i].id) {
          foundProducts.push(data[idItems[i] - 1]);
          // return false;
        }
      }

      // console.log(foundProducts);
      return res.json(foundProducts);
    });
  }
}

export default new UserRoutes().router;
