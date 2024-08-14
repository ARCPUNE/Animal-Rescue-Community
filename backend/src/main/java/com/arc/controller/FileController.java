package com.arc.controller;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.arc.service.FileService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/img")
@RequiredArgsConstructor
public class FileController {

	private final FileService fileService;
	private final Environment environment;
	
	@PostMapping("/upload/{fileType}")
	public ResponseEntity<?> uploadFile(@PathVariable String fileType,@RequestPart MultipartFile file) throws IOException {
		String filePath = getFilePath(fileType);
		String uploadedFileName = fileService.uploadFile(filePath, file);
		return ResponseEntity.ok("File Uploaded Successfully "+ uploadedFileName);
	}

	@GetMapping("/{fileType}/{fileName}")
    public ResponseEntity<?> serveFile(@PathVariable String fileType, @PathVariable String fileName, HttpServletResponse response) throws IOException {
        String filePath = getFilePath(fileType);
        InputStream fileStream = fileService.getResourceFile(filePath, fileName);
        
        response.setContentType(getContentType(fileName));
        StreamUtils.copy(fileStream, response.getOutputStream());
        response.flushBuffer();
        
        return ResponseEntity.ok().build();
    }
    
	private String getFilePath(String fileType) {
	    switch (fileType.toLowerCase()) {
	        case "animals":
	            return environment.getProperty("project.img.animals");
	        case "donations":
	            return environment.getProperty("project.img.donations");
	        case "expenses":
	            return environment.getProperty("project.img.expenses");
	        default:
	            throw new IllegalArgumentException("Invalid file type");
	    }
	}
	
	private String getContentType(String fileName) {
		String contentType;

	    String fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
	    switch (fileExtension) {
	        case "png":
	            contentType = MediaType.IMAGE_PNG_VALUE;
	            break;
	        case "jpeg":
	        case "jpg":
	            contentType = MediaType.IMAGE_JPEG_VALUE;
	            break;
	        case "gif":
	            contentType = MediaType.IMAGE_GIF_VALUE;
	            break;
	        default:
	            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // fallback for unknown types
	            break;
	    }
	    return contentType;
	}
}