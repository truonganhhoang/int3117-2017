package trippleT.cfg;

import java.util.ArrayList;
import java.util.List;

import trippleT.solver.result.InputPathResult;
import trippleT.solver.result.ResultParser;

public class TryResultParser {
	public static void main(String[] args) {
		
		List<String> list = new ArrayList<>();
		list.add("sat");
		list.add("(model ");
		list.add("  (define-fun b_s () Real");
		list.add("    0.0)");
		list.add("  (define-fun a_s () Real");
		list.add("    0.0)");
		list.add(")");
		list.add("(:assert-lower 1");
		list.add(" :assert-upper 1");
		list.add(" :final-checks 1");
		list.add(" :memory       2.90");
		list.add(" :pivots       1");
		list.add(" :time         0.00");
		list.add(" :total-time   0.01)");
		
		List<String> listParameter = new ArrayList<>();
		listParameter.add("a");
		listParameter.add("b");
		
		ResultParser report = new ResultParser();
		report.setListParameter(listParameter);
		InputPathResult verificationReport= report.generateInputPathResult(list);
		verificationReport.print();
	}
}
