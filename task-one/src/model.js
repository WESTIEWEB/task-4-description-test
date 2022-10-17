class FileTreeNode {
    constructor(nodeId, name, type) {
      this.nodeId = nodeId;
      this.name = name;
      this.type = type;
      this.parentNode = null;
      this.children = [];
    }
  
    setParent(parentNode) {
      this.parentNode = parentNode;
    }
  
    addChild(node) {
      if (this.type !== 'DIRECTORY') {
        throw 'Cannot add child node to a non-directory node';
      }
  
      this.children.push(node);
      node.setParent(this);
    }
  
    getChildren() {
      return this.children;
    }
  }


class FileTree {
    constructor() {
      this.nodes = [];
    }
  
    getRootNodes() {
      const result = [];
      for (let i = 0; i < this.nodes.length; i++) {
        if (!this.nodes[i].parentNode) {
          result.push(this.nodes[i]);
        }
      }
  
      return result;
    }
  
    findNodeById(nodeId) {
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].nodeId === nodeId) {
          return this.nodes[i];
        }
      }
  
      return null;
    }
  
    // a parent tree is add
    createParentTree(inputNode) {
      var node = new FileTreeNode(inputNode.parentId, '', 'DIRECTORY');
  
      this.nodes.push(node);
  
      return node;
    };
  
    createNode(nodeId, name, type, parentNode) {
      const node = new FileTreeNode(nodeId, name, type);
      let flag = 0; // flag initialized
      if (parentNode) {
        parentNode.addChild(node);
      }

      // forEach block 
      this.nodes.forEach(function(dataNode) {
        // validate current node to this.nodes to set the parentNode, name & add Child
        if (dataNode.nodeId === node.nodeId) {

          // initializing parent node
          dataNode.parentNode = node.parentNode;
          // initialised name
          dataNode.name = node.name;
          
          // adding a child to current node
          node.addChild(dataNode);

          // incrementing flag when dataNode.node isEqual node.nodeID
          flag += 1;
        }
      });
      
      // when dataNode.node is not Equal node.nodeID
      if(flag === 0) {
        this.nodes.push(node);
      }
    }
  }

  export default FileTree
  