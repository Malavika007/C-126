import * as React from 'react'
import { Button, View, Platform, Image, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class PickImage extends React.Component{

    state = {
        image:null,
    };

    render(){
        let {image} = this.state;

        return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Button title="pick an image from camera roll" 
                onPress={this.Pick_image}
                />
        </View>
        );
    }
    componentDidMount(){
        this.getPermissionAsync();
    }

    getPermissionAsync = async()=> {
        if(Platform.OS !== "web"){
            const{status} =  await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== "granted"){
                Alert.alert("Sorry, we need the camera roll permissions to make this work")
            }
        }
    }
    uploadImage = async(uri)=>{
        const data = newFormData();
        let filename = uri.split('/')[uri.split('/').length-1]
        const fileToUpload = {
            uri:uri,
            name:filename,
            type:type
        };
data.append("digit", fileToUpload);
fetch("https://f292a3137990.ngrok.io/predict-digit", {
    method:"POST",
    body:data,
    headers:{
        'content-type':'multipart/form-data',
    },
})
.then((response)=>response.json())
.then((result)=>{
    console.log("success:",result);
})
.catch((error)=>{
 console.log('error:', error)
});
    };
    PickImage = async()=>{
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.mediaTypeOptions.all,
                aspect:[4,3],
                quality:1,
            });
            if (!result.cancelled){
                this.setState({Image:result.data});
                this.uploadImage(result.uri);
            }
        }
        catch(E){
            console.log(E)
        }
    }
}