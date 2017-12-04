import static org.junit.Assert.*;

import org.junit.Test;

public class TestUCLN {

	@Test
	public void test() {
		UCLN ucln = new UCLN();
		System.out.println(" a = 0 and b != 0");
		int a = 0;
		int b = 6;
		int expResult = 6;
		int result = ucln.findUCLN(a, b);
		assertEquals(expResult, result);
	}

	@Test
	public void test2() {
		UCLN ucln = new UCLN();
		System.out.println(" b = 0 and a != 0");
		int a = 6;
		int b = 0;
		int expResult = 6;
		int result = ucln.findUCLN(a, b);
		assertEquals(expResult, result);
	}

	@Test
	public void test2NumberEqual() {
		UCLN ucln = new UCLN();
		System.out.println("Test a = b");
		int a = 6;
		int b = 6;
		int expResult = 6;
		int result = ucln.findUCLN(a, b);
		assertEquals(expResult, result);
	}
	
	@Test
    public void testNormalValue() {
		UCLN ucln = new UCLN();
        System.out.println("Test a = 15 and b = 5");
        int a = 15;
        int b = 5;
        int expResult = 5;
        int result = ucln.findUCLN(a, b);
        assertEquals(expResult, result);
    }

}
