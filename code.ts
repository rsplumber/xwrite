

figma.showUI(__html__);
figma.ui.resize(500,500)



var selected_text_nodes = [];

const LTR  = 'LTR';
const RTL = 'RTL'
var direction = LTR;

function changeDirection(){
  if(direction === RTL){
    direction = LTR
  }else{
    direction = RTL
  }
}

function detectTexts(frame:FrameNode){
      
  const textNodes:TextNode[] = frame.children.filter(node =>node.type ==="TEXT") as TextNode[]

  textNodes.forEach(async text_node => {
        await figma.loadFontAsync(<FontName> text_node.fontName);
        
        if(selected_text_nodes.find(element=>element.node ===text_node) == null){
          selected_text_nodes.push({
            "id" : text_node.id,
            "node": text_node,
            "text" : text_node.characters,
            "final_text" : ""
          });
        }

        text_node.characters = "aa" + selected_text_nodes.length

  });
}



figma.ui.onmessage = async msg => {

  var command_type = msg['type'];
  switch(command_type){
    case "detect_texts" :
     
      const frame:FrameNode = figma.currentPage.selection.find(node => node.type ==="FRAME") as FrameNode;
      detectTexts(frame);

      figma.ui.postMessage({
        'type' : command_type,
        'data' : selected_text_nodes
      })
      
    return;
    case "change_direction" :
   
      changeDirection();

      figma.ui.postMessage( {
        'type' : command_type,
        'data' : direction
      })
      
    return;
    case "apply_changes":

    break;
  }
  figma.closePlugin();

};


