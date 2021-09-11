coerce - "convert without really converting".
That means that JS tries to interpret some value (string, number, null) as a boolean
JS generates a new boolean which is temporarily used in the comparison.

To observe the closure you must Call function in different scope than where function was original defined.