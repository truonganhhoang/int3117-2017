package trippleT.utils.smt;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class MakeSmt {
	public static void main(String[] args) throws IOException {
		List<String> params = new ArrayList<String>();
		params.add("a");
		params.add("b");
		
		List<String> constraints = new ArrayList<String>();
		constraints.add("(> a_s 2)");
		constraints.add("(< b_s 3)");
		make(params, constraints, "path1");
	}
	
	public static void make(List<String> params, List<String> constraints, String filename) throws IOException
	{
		String content = "";
		File directory = new File("smt");
		
		if (! directory.exists()){
		        directory.mkdir();
		}
		
		for(String param: params) {
			content += "(declare-fun " + param+ "_s" + " () Real)\n";
		}
		
		for(String constraint: constraints) {
			content += "(assert " + constraint +" )\n";
		}
		
		content += "(check-sat)\n" + 
				   "(get-model)";
		Files.write(Paths.get("./smt/" + filename), content.getBytes());
	}
}
