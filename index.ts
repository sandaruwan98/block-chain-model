import * as crypto from "crypto";

class Transaction {
    constructor(
        public amount: number,
        public payer: string,
        public payee: string
    ) {}

    toString(){
        return JSON.stringify(this);
    }

}

class Block {
    constructor(
        public prevHash: string,
        public transaction: Transaction,
        public ts = Date.now()
    ) {}

    get hash(){
        const str = JSON.stringify(this);
        const hash = crypto.createHash("SHA256");
        hash.update(str).end();
        return hash.digest('hex');
    }
}


class Chain {
    public static instance = new Chain();

    chain: Block[];

    constructor() {
        this.chain = [ new Block( '' ,new Transaction(100,"genesis","sathoshi")) ] ;
    }

    
    public get lastblock() {
        return this.chain[this.chain.length-1]
    }
    
    addBlock(transaction: Transaction, senderPublicKey:string,signature:Buffer ){
        const newBlock = new Block(this.lastblock.hash,transaction);
        this.chain.push(newBlock);
        
    }
}
