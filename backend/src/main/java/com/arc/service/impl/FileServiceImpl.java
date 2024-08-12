package com.arc.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arc.service.FileService;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadFile(String path, MultipartFile file) throws IOException {

		String fileName = generateIncrementalFileName(path, file.getOriginalFilename()) ;
		String filePath = path + File.separator + fileName;
		
		File f = new File(path);
		if (!f.exists()) {
			f.mkdir();
		}
		
		Files.copy(file.getInputStream(),Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
		
		return fileName;
	}

	@Override
	public InputStream getResourceFile(String path, String fileName) throws FileNotFoundException {
		
		String filePath = path + File.separator + fileName;
		return new FileInputStream(filePath);
	}
	
	private String generateIncrementalFileName(String directoryPath, String originalFileName) {
	    File file = new File(directoryPath, originalFileName);
	    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
	    String baseName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
	    
	    int counter = 1;
	    while (file.exists()) {
	        String newFileName = baseName + "_" + counter + fileExtension;
	        file = new File(directoryPath, newFileName);
	        counter++;
	    }
	    return file.getName();
	}

}
