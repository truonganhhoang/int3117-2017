package trippleT.solver;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Z3Solver {

	public static void main(String[] args) throws IOException {
		runZ3("path1.smt2").forEach(System.out::println);
	}
	
	public static List<String> runZ3(String filename) 
			throws IOException {
		List<String> result = new ArrayList<String>();
		String s;
		
        String filePath = "smt/" + filename;
        
        if(System.getProperty("os.name").equalsIgnoreCase("Linux")) {
            try {
            	Process p = Runtime.getRuntime().exec("z3 -smt2 -st -T:1 " + filePath);
            	
                BufferedReader br = new BufferedReader( new InputStreamReader(p.getInputStream()));
                while ((s = br.readLine()) != null)
                {
                    result.add(s);
                    System.out.println(s);
                }
                try {
    				p.waitFor();
    			} catch (InterruptedException e) {
    				// TODO Auto-generated catch block
    				e.printStackTrace();
    			}
            } catch (Exception e) {}
        }
        else {
    		String pathToZ3 = "z3\\bin\\z3.exe";
//    		System.out.println("filename: " + filename);
    		ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", pathToZ3 + " -smt2 -st -T:1 " + filePath);
    		builder.redirectErrorStream(true);
    		Process p = builder.start();
    		BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
    		String line;
    		while (true) {
    			line = r.readLine();
    			if (line == null) {
    				break;
    			}
    			result.add(line);
    		}
        }
            
		
		//p.destroy();
		return result;
	}

}
