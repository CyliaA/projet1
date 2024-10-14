
class Animate extends pc.ScriptType {
    
    static addAttributes(){
        
        //this.attributes.add('attribute', {type: 'entity'});
    }
    initialize()
    {
        Animate.Instance=this;
    }
    
    animateUI(entity,scale)
    {   
        entity
        .tween(entity.getLocalScale())
        .to(new pc.Vec3(scale.x,scale.y,scale.z), 0.8, pc.BackOut)
        .loop(false)
        .yoyo(true)
        .start();
    }

}
pc.registerScript(Animate,'animate');
Animate.addAttributes();