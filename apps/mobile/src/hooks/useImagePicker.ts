import { useState } from "react"
import * as ImagePicker from "expo-image-picker"

export interface PickedImage {
  uri: string
  mimeType: string
}

export function useImagePicker() {
  const [image, setImage] = useState<PickedImage | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function pickImage() {
    setError(null)

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permission.granted) {
      setError("Permission to access photos was denied")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (result.canceled || result.assets.length === 0) {
      return
    }

    const asset = result.assets[0]!
    setImage({
      uri: asset.uri,
      mimeType: asset.mimeType ?? "image/jpeg",
    })
  }

  function clearImage() {
    setImage(null)
    setError(null)
  }

  return { image, error, pickImage, clearImage }
}
