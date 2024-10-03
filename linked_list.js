export class LinkedList {
    constructor(head = null) {
        this.head = head
    }

    appendNode(newNode){
        let node = this.head;
        if(node==null){
            //Means it's just empty list
            this.head = newNode;
            return;
        }
        newNode.next = this.head;
        this.head = newNode;
    }

    removeHead(){
        if(this.head==null){
            return null;
        }
        let temp = this.head;
        this.head = this.head.next;
        return temp;
    }

    printList(){
        let node = this.head;
        let output = "HEAD->"
        while (node) {
            output += node.data + "->";
            node = node.next;
        }
        console.log(output+"NULL");
    }
}

export class Node {
    constructor(data) {
        this.data = data
        this.next = null                
    }
}