import { display } from "./display";
import { player } from "./player";

export class playerinfo {
    constructor() {
        this.player = new player();
        this.display = new display('player');
    }

}