import java.util.Scanner;

public class NumberCompare {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input three numbers
        System.out.print("Enter the first number: ");
        int num1 = scanner.nextInt();

        System.out.print("Enter the second number: ");
        int num2 = scanner.nextInt();

        System.out.print("Enter the third number: ");
        int num3 = scanner.nextInt();

        // Find the largest number
        if (num1 >= num2 && num1 >= num3) {
            System.out.println("Largest number: " + num1);
        } else if (num2 >= num1 && num2 >= num3) {
            System.out.println("Largest number: " + num2);
        } else {
            System.out.println("Largest number: " + num3);
        }

        // Find the smallest number
        if (num1 <= num2 && num1 <= num3) {
            System.out.println("Smallest number: " + num1);
        } else if (num2 <= num1 && num2 <= num3) {
            System.out.println("Smallest number: " + num2);
        } else {
            System.out.println("Smallest number: " + num3);
        }

        // Calculate the average
        double average = (double) (num1 + num2 + num3) / 3;
        System.out.println("Average: " + average);

        scanner.close();
    }
}
