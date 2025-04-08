import { collection,addDoc } from "firebase/firestore";
import { db } from "./config";
interface shopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string; 
}

const shoes: shopItem[] = [
    {
        id: "shoe-001",
        name: "Nike Air Force 1",
        description: "Classic all-white sneakers with a sleek leather finish.",
        price: 120,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d9f1d9ee-a848-4a36-aab9-48b241078ebb/AIR+FORCE+1+LE+%28GS%29.png"
    },
    {
        id: "shoe-002",
        name: "Adidas Ultraboost",
        description: "High-performance running shoes with Boost cushioning.",
        price: 180,
        image: "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/9ae635fac9f6461bb9759397a2946fc8_9366/ultraboost-1.0-shoes.jpg"
    },
    {
        id: "shoe-003",
        name: "Puma RS-X",
        description: "Retro-futuristic sneakers with bold color-blocking.",
        price: 110,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_550,h_550/global/390776/53/sv01/fnd/EEA/fmt/png/RS-X-Efekt-PRM-Sneakers"
    },
    {
        id: "shoe-004",
        name: "New Balance 550",
        description: "Vintage-inspired basketball shoes with a sturdy build.",
        price: 130,
        image: "https://nb.scene7.com/is/image/NB/bb550lem_nb_02_i?$pdpflexf2$&qlt=80&wid=880&hei=880"
    },
    {
        id: "shoe-005",
        name: "Jordan 1 Retro High",
        description: "Iconic basketball sneakers with premium leather construction.",
        price: 200,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/89235dab-3047-41d2-af7b-d0a77f43fe6a/AIR+JORDAN+1+HIGH+G.png"
    }
];

async function seed() {
    try {
        const shoeCollection = collection(db, "shoedb");
        
        for (const shoe of shoes) {
            const docRef = await addDoc(shoeCollection, shoe);
            console.log(`Document added with ID: ${docRef.id}`);
        }

        console.log("All documents added successfully.");
    } catch (e) {
        console.error("Error adding documents: ", e);
    }
}

seed();