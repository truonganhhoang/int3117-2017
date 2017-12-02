package ducanhnguyen.solver.standardStrategy.SMTLIB;

import java.util.ArrayList;

/**
 * 
 * @author anhanh
 *
 */
public class CreateSufficientSmtLib {
	private ArrayList<String> testcase;
	private ArrayList<String> equationList;
	private String smtLib;
	private static final String DIVISION_DEFINE = "(define-fun myDivision (( x Real) (y Real)) Real\n"
			+ "   (ite (= y 0)\n" + "      0.0 \n" + "      (/ x y)\n" + "   )\n" + ")\n";
	private static final String NO_DIVISION_DEFINE = "";
	private static final String OPTION_TIMEOUT = "(set-option :timeout 1000)";

	public CreateSufficientSmtLib(ArrayList<String> testcase, ArrayList<String> equationList) {
		this.equationList = equationList;
		this.testcase = testcase;
		smtLib = "";
		run();
	}

	private void run() {
		smtLib += OPTION_TIMEOUT + "\n" + NO_DIVISION_DEFINE;
		GenerateDeclareFun g = new GenerateDeclareFun(testcase);
		smtLib += g.getOutput();
		for (String equation : equationList) {

			ConvertToSmtLibv2 c = new ConvertToSmtLibv2(equation);
			c.run();
			smtLib += "(assert" + c.getOutput() + ")\n";
		}
		smtLib += "(check-sat)\n(get-model)";
		// smtLib = smtLib.replace("div", "myDivision"); Beacause of
		// NO_DIVISION_DEFINE
		smtLib = smtLib.toLowerCase().replace("real", "Real").replace("int", "Int");
	}

	public String getOutput() {
		return smtLib;
	}

	public void writeOutputToFile(String filePath) {

	}

	public static void main(String[] args) {
		ArrayList<String> testcases = new ArrayList<>();
		testcases.add("int A");
		testcases.add("int B");
		testcases.add("int C");
		testcases.add("int D");

		ArrayList<String> testpaths = new ArrayList<>();
		testpaths.add("((C==D/((B-2)-1)))");

		CreateSufficientSmtLib i = new CreateSufficientSmtLib(testcases, testpaths);
		System.out.println(i.getOutput());
	}
}
