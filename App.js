import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Expo from "expo";
import { FontAwesome } from "@expo/vector-icons";

const API_KEY = "YOUR_API_KEY";
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
const Separator = () => <View style={styles.separator} />;

async function googleVisionApi(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          { type: "LABEL_DETECTION", maxResults: 8 },
          { type: "OBJECT_LOCALIZATION", maxResults: 20 },
          // { type: 'LANDMARK_DETECTION', maxResults: 5 },
          //{ type: 'FACE_DETECTION', maxResults: 5 },
          // { type: 'LOGO_DETECTION', maxResults: 5 },
          // { type: 'TEXT_DETECTION', maxResults: 5 },
          // { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
          //{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
          //{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
          //{ type: 'CROP_HINTS', maxResults: 5 },
          // { type: 'WEB_DETECTION', maxResults: 5 }
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const parsed = await response.json();

  console.log("Result:", parsed);

  return parsed;
}

export default function App() {
  let yük;
  let gen;
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [status1, setStatus1] = React.useState(null);
  const [status2, setStatus2] = React.useState(null);
  const [status3, setStatus3] = React.useState(null);
  const [status4, setStatus4] = React.useState(null);
  const [status5, setStatus5] = React.useState(null);

  const takePic = async () => {
    const {
      cancelled,
      uri,
      base64,
      width,
      height,
    } = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    console.log("W " + width + " H " + height);

    if (!cancelled) {
      setImage(uri);
      setStatus("Fotoğraf inceleniyor...");
      try {
        const result = await googleVisionApi(base64);

        yük =
          (result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[3].y -
            result.responses[0].localizedObjectAnnotations[0].boundingPoly
              .normalizedVertices[0].y) *
          350;
        gen =
          (result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[1].x -
            result.responses[0].localizedObjectAnnotations[0].boundingPoly
              .normalizedVertices[0].x) *
          350;

        let kordinatx =
          result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[0].x * 350;
        let kordinaty =
          result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[0].y * 350;

        console.log(
          "kordinatlar x:" +
            kordinatx +
            " y:" +
            kordinaty +
            " genişlik:" +
            gen +
            " yükseklik:" +
            yük
        );

        setStatus(result.responses[0].labelAnnotations[0].description);
        setStatus1(result.responses[0].labelAnnotations[1].description);
        setStatus2(result.responses[0].labelAnnotations[2].description);
        setStatus3(result.responses[0].labelAnnotations[3].description);
        setStatus4(result.responses[0].labelAnnotations[4].description);
        setStatus5(result.responses[0].labelAnnotations[5].description);
      } catch (error) {
        console.log(error);
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  const imgEdit = async () => {
    if (!cancelled) {
      //setImage(uri);
      setStatus("Fotoğref inceleniyor....");
      try {
        const result = await googleVisionApi(base64);
      } catch (error) {
        console.log(error);
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  const getFromGallery = async () => {
    const {
      cancelled,
      uri,
      base64,
      width,
      height,
    } = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });

    console.log("W " + width + " H " + height);

    if (!cancelled) {
      setImage(uri);
      setStatus("Fotoğref inceleniyor....");
      try {
        const result = await googleVisionApi(base64);
        console.log(
          "x değeri " +
            result.responses[0].localizedObjectAnnotations[0].boundingPoly
              .normalizedVertices[0].x
        );
        console.log(
          "y değeri " +
            result.responses[0].localizedObjectAnnotations[0].boundingPoly
              .normalizedVertices[0].y
        );

        this.yük =
          (result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[3].y -
            result.responses[0].localizedObjectAnnotations[0].boundingPoly
              .normalizedVertices[0].y) *
          height *
          100;
        this.gen =
          (result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[1].x -
            result.responses[0].localizedObjectAnnotations[0].boundingPoly
              .normalizedVertices[0].x) *
          width *
          100;

        let kordinatx =
          result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[0].x * 1080;
        let kordinaty =
          result.responses[0].localizedObjectAnnotations[0].boundingPoly
            .normalizedVertices[0].y * 2280;

        console.log(
          "kordinatlar x:" +
            kordinatx +
            " y:" +
            kordinaty +
            " genişlik:" +
            gen +
            " yükseklik:" +
            yük
        );
        setStatus(result.responses[0].labelAnnotations[0].description);
        setStatus1(result.responses[0].labelAnnotations[1].description);
        setStatus2(result.responses[0].labelAnnotations[2].description);
        setStatus3(result.responses[0].labelAnnotations[3].description);
        setStatus4(result.responses[0].labelAnnotations[4].description);
        setStatus5(result.responses[0].labelAnnotations[5].description);
      } catch (error) {
        console.log(error);
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };
  renderImage = (topPosition, bottomPosition, leftPosition, rightPosition) => {
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View
        style={[
          styles.rectangle,
          {
            bottom: bottomPosition,
            left: leftPosition,
            width: topPosition,
            height: rightPosition,
          },
        ]}
      />
    </View>;
  };

  return (
    <View style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}

      {status && <Text style={styles.text1}>{status}</Text>}
      {status1 && <Text style={styles.text}>{status1}</Text>}
      {status2 && <Text style={styles.text}>{status2}</Text>}
      {status3 && <Text style={styles.text}>{status3}</Text>}
      {status4 && <Text style={styles.text}>{status4}</Text>}
      {status5 && <Text style={styles.text}>{status5}</Text>}
      <Separator />
      <Separator />
      <Separator />
      <Separator />

      <View
        style={[
          styles.rectangle,
          {
            bottom: 500,
            left: 200,
            width: 90,
            height: 70,
          },
        ]}
      />

      <TouchableOpacity style={styles.button} onPress={takePic}>
        <FontAwesome name="camera" size={35} color="black" />
      </TouchableOpacity>
      <Separator />

      <TouchableOpacity style={styles.button} onPress={getFromGallery}>
        <FontAwesome name="folder" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    margin: 2,
    color: "black",
  },
  text1: {
    margin: 2,
    color: "red",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imageContainer: {
    width: 200,
    height: 250,
    alignSelf: "center",
  },
  rectangle: {
    borderWidth: 1,
    borderColor: "red",
    position: "absolute",
  },
});
