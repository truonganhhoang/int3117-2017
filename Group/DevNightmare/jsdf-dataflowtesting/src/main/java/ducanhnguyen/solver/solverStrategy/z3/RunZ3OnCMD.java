package ducanhnguyen.solver.solverStrategy.z3;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Chạy file smt-lib trên cmd sử dụng SMT-Solver Z3
 * 
 * @author anhanh
 * 
 */
public class RunZ3OnCMD {
	private String Z3;
	private String Smt_Lib_path_file;
	private String result;

	public RunZ3OnCMD(String Z3, String Smt_Lib_path_file) throws IOException, InterruptedException {
		this.Z3 = Z3;
		this.Smt_Lib_path_file = Smt_Lib_path_file;
		result = "";
		run();
	}

	private void run() throws IOException, InterruptedException {
		Process p = Runtime.getRuntime().exec(Z3 + " -smt2 " + Smt_Lib_path_file);
		while (p.isAlive()) {
			Thread.sleep(10);
		}
		BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
		String line;
		while ((line = in.readLine()) != null) {
			result += line + "\n";
		}

	}

	public String getOutput() {
		return result;
	}

	public static void main(String[] args) throws IOException, InterruptedException {
		RunZ3OnCMD r = new RunZ3OnCMD("C:\\z3\\bin\\z3", "C:/he-rang-buoc1.smt2");
		System.out.println(r.getOutput());
	}
}
