import { createAvatar } from "@dicebear/avatars";
import * as style from '@dicebear/avatars-avataaars-sprites';

const svgAvatarGenerator = (seed, config) => {
    let svg = createAvatar(style, {
        seed: seed,
        mouth: ["concerned", "default", "disbelief", "eating", "grimace", "sad", "scream", "screamOpen", "serious", "smile", "tongue", "twinkl", "vomit"],
        top: ["longHair", "shortHair", "eyepatch", "hat", "hijab", "turban", "bigHair", "bob", "bun", "curly", "curvy", "dreads", "frida", "fro", "froAndBand", "miaWallace"],
        hatColor: ["pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink"],
        hairColor: ["brownDark", "pastel", "pastelPink", "platinum", "red", "gray", "silverGray"],
        accessories: ["kurt", "prescription01", "prescription02", "round", "sunglasses", "wayfarers"],
        accessoriesColor: ["gray02", "heather", "pastel", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"],
        facialHair: ["medium", "beardMedium", "light", "beardLight", "majestic", "beardMajestic", "fancy", "moustaceFancy", "magnum", "moustacheMagnum"],
        clothes:["blazer", "blazerAndShirt", "blazerAndSweater", "sweater", "collarAndSweater", "shirt", "graphicShirt", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck", "hoodie", "overall"],
        clothesColor: ["black", "blue", "blue01", "blue02", "blue03", "gray", "gray01", "gray02", "heather", "pastel", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"],
        skin: ["tanned", "yellow", "pale", "light", "brown", "darkBrown", "black"],
        ...config
    });
    
    return svg;
}

export default svgAvatarGenerator;