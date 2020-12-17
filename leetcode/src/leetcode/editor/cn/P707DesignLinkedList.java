package leetcode.editor.cn;

public class P707DesignLinkedList {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class MyLinkedList {

        private class Node {
            int val;
            Node next;

            public Node(int val) {
                this.val = val;
            }

            public Node(int val, Node next) {
                this.val = val;
                this.next = next;
            }
        }

        private Node head;
        private int size = 0;

        /**
         * Initialize your data structure here.
         */
        public MyLinkedList() {
            head = new Node(0);
        }

        /**
         * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
         */
        public int get(int index) {
            if (index >= size) return -1;
            Node cur = head.next;
            while (index-- > 0) cur = cur.next;
            return cur.val;
        }

        /**
         * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
         */
        public void addAtHead(int val) {
            addAtIndex(0, val);
        }

        /**
         * Append a node of value val to the last element of the linked list.
         */
        public void addAtTail(int val) {
            addAtIndex(size, val);
        }

        /**
         * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
         */
        public void addAtIndex(int index, int val) {
            if (index > size) return;
            Node cur = head;
            while (index-- > 0) cur = cur.next;
            Node n = new Node(val);
            n.next = cur.next;
            cur.next = n;
            size++;
//            print();
        }

        /**
         * Delete the index-th node in the linked list, if the index is valid.
         */
        public void deleteAtIndex(int index) {
            if (index >= size) return;
            Node cur = head;
            while (index-- > 0) cur = cur.next;
            cur.next = cur.next.next;
            size--;
//            print();
        }

        private void print() {
            System.out.print(size + ": ");
            Node cur = head.next;
            while(cur !=  null) {
                System.out.print(cur.val + "->");
                cur = cur.next;
            }
            System.out.println();
        }
    }

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
//leetcode submit region end(Prohibit modification and deletion)

}