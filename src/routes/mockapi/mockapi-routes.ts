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
  id?: string;
}

class MockApiRoutes {
  router = Router();

  constructor() {
    this.products();
    this.departament();
    this.carousel();
    this.frontProducts();
    this.fromUniqueDepartment();
    this.search();
    this.oneProduct();
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

  departament() {
    this.router.get("/departaments", async (req: Request, res: Response) => {
      const alldepartaments: String[] = [];

      const data = await this.allProducts();

      data.forEach((valueOf) =>
        alldepartaments.push(valueOf.departamento as String)
      );

      let uniqueCategories: String[] = alldepartaments.filter((c, index) => {
        return alldepartaments.indexOf(c) === index;
      });

      return res.send(uniqueCategories);
    });
  }

  carousel() {
    this.router.get("/slides", async (req: Request, res: Response) => {
      const data = await this.allProducts();

      // const allProducts: ProductsModel[] = [];
      const fiveSlides = [];

      data.forEach((valueOf: ProductsModel) => {
        const slides: ProductsModel = {
          nome: valueOf.nome,
          preco: valueOf.preco,
          image:
            "https://static.vecteezy.com/ti/vetor-gratis/p3/226407-tshirt-vector-camisa-preta-gratis-vetor.jpg",
        };
        data.push(slides);
      });

      for (let index = 0; index < 5; index++) {
        const n = Math.floor(Math.random() * data.length - 1);
        const slides = {
          nome: data[n].nome,
          preco: data[n].preco,
          image:
            "https://static.vecteezy.com/ti/vetor-gratis/p3/226407-tshirt-vector-camisa-preta-gratis-vetor.jpg",
        };
        fiveSlides.push(slides);
      }

      return res.send(fiveSlides);
    });
  }

  frontProducts() {
    this.router.get("/frontproducts", async (req: Request, res: Response) => {
      const data = await this.allProducts();

      const fiveProducts = [];

      for (let index = 0; index < 8; index++) {
        const n = Math.floor(Math.random() * data.length - 1);
        const products = {
          id: data[n].id,
          nome: data[n].nome,
          preco: data[n].preco,
          categoria: data[n].categoria,
          material: data[n].material,
          descricao: data[n].descricao,
          departamento: data[n].departamento,
          image:
            "https://static.vecteezy.com/ti/vetor-gratis/p3/226407-tshirt-vector-camisa-preta-gratis-vetor.jpg",
        } as ProductsModel;
        fiveProducts.push(products);
      }

      return res.send(fiveProducts);
    });
  }

  fromUniqueDepartment() {
    this.router.get(
      "/fromuniquedepartment",
      async (req: Request, res: Response) => {
        const data = await this.allProducts();

        const departamentChoosed = req.query.queryDepartment;

        const productsOfTheDepartment: ProductsModel[] = [];

        data.forEach((data) => {
          if (data.departamento == departamentChoosed)
            productsOfTheDepartment.push(data);
        });

        return res.send(productsOfTheDepartment);
      }
    );
  }

  search() {
    this.router.get("/search", async (req: Request, res: Response) => {
      const data = await this.allProducts();

      const searchTerm = req.query.searchTerm;

      const foundProducts: ProductsModel[] = [];

      data.forEach((data) => {
        if (typeof searchTerm == "string") {
          if (data.nome?.includes(searchTerm)) foundProducts.push(data);
        }
      });

      return res.send(foundProducts);
    });
  }

  oneProduct() {
    this.router.get("/oneProduct", async (req: Request, res: Response) => {
      const data = await this.allProducts();

      const productId = req.query.productId;

      const foundProduct: ProductsModel[] = [];

      data.forEach((data) => {
        if (data.id == productId) foundProduct.push(data);
      });

      const name = foundProduct[0].nome;
      const description = foundProduct[0].descricao;
      const category = foundProduct[0].categoria;
      const image = foundProduct[0].imagem;
      const price = foundProduct[0].preco;
      const fabric = foundProduct[0].material;
      const departament = foundProduct[0].departamento;
      const id = foundProduct[0].id;

      return res.json({
        name,
        description,
        category,
        image,
        price,
        fabric,
        departament,
        id,
      });
    });
  }
}

export default new MockApiRoutes().router;
