package ducanhnguyen.solver.standardStrategy.SMTLIB;

import java.util.ArrayList;

/**
 * Tạo các khai báo declare-fun theo chuẩn SMT-Lib.
 * 
 * @author anhanh
 * 
 */
class GenerateDeclareFun {
	private String declareFun;
	private ArrayList<Bien> variableList;

	protected GenerateDeclareFun(ArrayList<String> testcases) {
		this.variableList = convertStringList(testcases);
		run();
	}

	private void run() {
		declareFun = "";
		for (Bien var : variableList) {
			switch (var.getType()) {
			case Bien.DOUBLE:
				declareFun += "(declare-fun " + var.getName() + " () Real)";
				break;
			case Bien.INT:
				declareFun += "(declare-fun " + var.getName() + " () Int)";
				break;
			case Bien.DOUBLE_ARRAY_ONE_DIMENSION:
				declareFun += "(declare-fun " + var.getName() + " (Real) Real)";
				break;
			case Bien.INT_ARRAY_ONE_DIMENSION:
				declareFun += "(declare-fun " + var.getName() + " (Int) Int)";
				break;
			case Bien.DOUBLE_ARRAY_TWO_DIMENSION:
				declareFun += "(declare-fun " + var.getName() + " (Real Real) Real)";
				break;
			case Bien.INT_ARRAY_TWO_DIMENSION:
				declareFun += "(declare-fun " + var.getName() + " (Int Int) Int)";
				break;
			}
			declareFun += "\n";
		}
	}

	protected String getOutput() {
		return declareFun;
	}

	public static void main(String[] args) {
		ArrayList<String> testcases = new ArrayList<>();
		testcases.add("double a[][]");
		testcases.add("double b");

		GenerateDeclareFun g = new GenerateDeclareFun(testcases);
		g.run();
		System.out.println(g.getOutput());
	}

	private ArrayList<Bien> convertStringList(ArrayList<String> testcases) {
		ArrayList<Bien> variableList = new ArrayList<>();
		for (String testcase : testcases) {
			String type = testcase.split(" ")[0];
			if (testcase.contains("]")) {
				String name = testcase.substring(testcase.indexOf(" ") + 1, testcase.indexOf("["));
				if (testcase.contains("][")) // nếu là mảng hai chi�?u
					switch (type) {
					case "int":
						variableList.add(new Bien(name, Bien.INT_ARRAY_TWO_DIMENSION));
						break;
					case "double":
					case "float":
						variableList.add(new Bien(name, Bien.DOUBLE_ARRAY_TWO_DIMENSION));
						break;
					}
				else
					// nếu là mảng 1 chi�?u
					switch (type) {
					case "int":
						variableList.add(new Bien(name, Bien.INT_ARRAY_ONE_DIMENSION));
						break;
					case "double":
					case "float":
						variableList.add(new Bien(name, Bien.DOUBLE_ARRAY_ONE_DIMENSION));
						break;
					}
			} else { // nếu không phải khai báo mảng
				String name = testcase.split(" ")[1];
				switch (type) {
				case "int":
					variableList.add(new Bien(name, Bien.INT));
					break;
				case "double":
				case "float":
					variableList.add(new Bien(name, Bien.DOUBLE));
					break;
				}
			}
		}
		return variableList;
	}
}
