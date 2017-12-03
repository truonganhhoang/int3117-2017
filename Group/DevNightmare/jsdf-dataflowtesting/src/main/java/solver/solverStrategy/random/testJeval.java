package solver.solverStrategy.random;

import net.sourceforge.jeval.EvaluationException;
import net.sourceforge.jeval.Evaluator;

public class testJeval {
	testJeval(String bieuThucLogic) throws EvaluationException {
		String giaTri = new Evaluator().evaluate(bieuThucLogic);
		System.out.println(giaTri);
	}

	public static void main(String[] args) throws EvaluationException {
		new testJeval(" !(6<0) ");
	}
}
