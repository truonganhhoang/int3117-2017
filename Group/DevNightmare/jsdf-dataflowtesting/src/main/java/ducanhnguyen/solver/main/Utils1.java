package ducanhnguyen.solver.main;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class Utils1 {
	public static void writeToFile(String path, String content) throws InterruptedException {
		File file = new File(path);
		// if file doesnt exists, then create it
		if (file.exists()) {
			file.delete();
		}
		while (true) {
			try {
				file.createNewFile();
				FileWriter fw = new FileWriter(file.getAbsoluteFile());
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(content);
				bw.close();
				break;
			} catch (IOException e) {
				Thread.sleep(10);
			}
		}
	}

	public static ArrayList<String> convertToString(String str, String delimiter) {
		ArrayList<String> output = new ArrayList<String>();
		for (String item : str.split(delimiter))
			output.add(item);
		return output;
	}
}
