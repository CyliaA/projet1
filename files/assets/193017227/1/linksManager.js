class LinksManager extends pc.ScriptType {
    
    static addAttributes(){
        
        this.attributes.add('EnvironmentLinks', {type: 'string',array:true});
        this.attributes.add('tutorialScreen', {type: 'entity'});
        this.attributes.add('skipButton', {type: 'entity'});
        this.attributes.add('Joystick', {type: 'entity'});
    }
    initialize()
    {
        console.log("Initialize");
        LinksManager.Instance=this;
        this.skipButton.button.on('click',this.screenDisable,this);
        var self = this;
        setTimeout(function(){
          
           self.checkPlatform();
           
        }, 200);
         this.checkPlatform();    //checking for mobile or desktop 


    }
    checkPlatform()
    {
        if(this.app.touch && onMobile)
        {
            this.tutorialScreen.enabled=true;
        }

    }
    screenDisable()
    {   
        console.log('clicked');
        LinksManager.Instance.tutorialScreen.enabled=false;
        LinksManager.Instance.Joystick.enabled=true;
    }
}
pc.registerScript(LinksManager,'linksManager');
LinksManager.addAttributes();