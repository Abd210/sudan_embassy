import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Upload({ onFile, previewUrl }){
  const [localPreview, setLocalPreview] = useState(previewUrl || '')
  const onDrop = useCallback((accepted) => {
    const f = accepted[0]
    if (!f) return
    setLocalPreview(URL.createObjectURL(f))
    onFile && onFile(f)
  }, [onFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: { 'image/*': [] } })

  return (
    <div className="flex items-center gap-4">
      <div {...getRootProps()} className={`flex-1 border-2 border-dashed rounded p-4 cursor-pointer ${isDragActive? 'border-sudan-green bg-green-50' : 'border-gray-300'}`}>
        <input {...getInputProps()} />
        <div className="text-sm text-gray-600">{isDragActive ? 'Drop the image here...' : 'Drag & drop an image here, or click to select'}</div>
      </div>
      <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
        {localPreview ? (<img src={localPreview} alt="preview" className="w-full h-full object-cover" />) : (<span className="text-xs text-gray-500">No image</span>)}
      </div>
    </div>
  )
}


