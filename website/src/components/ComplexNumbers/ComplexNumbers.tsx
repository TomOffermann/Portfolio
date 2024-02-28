import "./ComplexNumbers.css";
import { useState } from "react";

enum Operation {
  Add,
  Sub,
  Mul,
  Div,
}

function ComplexNumbers() {
  const [precision, setPrecision] = useState<number>(3);

  const [conversion, setConversion] = useState<boolean>(false);

  const [cartesian, setCartesian] = useState<ComplexNumber>(
    new ComplexNumber(0, 0)
  );

  const [r, setR] = useState<number>(0);
  const [phi, setPhi] = useState<number>(0);

  const [a, setA] = useState<ComplexNumber>(new ComplexNumber(0, 0));
  const [b, setB] = useState<ComplexNumber>(new ComplexNumber(0, 0));

  const [op, setOp] = useState<Operation>(Operation.Add);

  const display = (
    a: ComplexNumber,
    b: ComplexNumber,
    c: Operation
  ): ComplexNumber => {
    if (c == Operation.Add) {
      return a.add(b);
    } else if (c == Operation.Sub) {
      return a.subtract(b);
    } else if (c == Operation.Mul) {
      return a.multiply(b);
    } else if (c == Operation.Div) {
      return a.divide(b);
    }
    return new ComplexNumber(0, 0);
  };

  return (
    <>
      <div className="CNContainer">
        <div>Precision:</div>
        <input
          className="Input"
          type="number"
          value={precision}
          onChange={(e) => setPrecision(parseInt(e.target.value))}
        />
      </div>
      <br />
      <div className="CNContainer">
        Conversion:
        <select
          className="SelectConversion"
          onChange={(e) =>
            e.target.value === "P->E"
              ? setConversion(false)
              : setConversion(true)
          }
        >
          <option value={"P->E"}>Polar → Euler</option>
          <option value={"E->P"}>Euler → Polar</option>
        </select>
      </div>
      <br />
      {!conversion ? (
        <>
          <div className="ComplexNumberInput">
            <input
              className="Input"
              type="number"
              defaultValue={0}
              value={cartesian.real}
              onChange={(e) =>
                setCartesian(
                  new ComplexNumber(parseFloat(e.target.value), cartesian.img)
                )
              }
            />
            {" + i ⋅ "}
            <input
              className="Input"
              type="number"
              defaultValue={0}
              value={cartesian.img}
              onChange={(e) =>
                setCartesian(
                  new ComplexNumber(cartesian.real, parseFloat(e.target.value))
                )
              }
            />
          </div>
          = <div>{cartesian.textEuler(precision)}</div>
        </>
      ) : (
        <>
          <div className="ComplexNumberInput">
            <input
              className="Input"
              type="number"
              defaultValue={0}
              value={r}
              onChange={(e) => setR(parseFloat(e.target.value))}
            />
            {" ⋅ exp(i ⋅ "}
            <input
              className="Input"
              type="number"
              defaultValue={0}
              value={phi}
              onChange={(e) => setPhi(parseFloat(e.target.value))}
            />
            {")"}
          </div>
          = <div>{ComplexNumber.eulerToPolar(r, phi).text(precision)}</div>{" "}
        </>
      )}
      <br />
      <br />
      <div>Arithmetic</div>
      <input
        className="Input"
        type="number"
        defaultValue={0}
        onChange={(e) =>
          setA(new ComplexNumber(parseFloat(e.target.value), a.img))
        }
      />
      <input
        className="Input"
        type="number"
        defaultValue={0}
        onChange={(e) =>
          setA(new ComplexNumber(a.real, parseFloat(e.target.value)))
        }
      />
      <select
        className="Select"
        onChange={(e) => {
          let o = e.target.value;
          if (o === "mul") {
            setOp(Operation.Mul);
          } else if (o === "sub") {
            setOp(Operation.Sub);
          } else if (o === "div") {
            setOp(Operation.Div);
          } else {
            setOp(Operation.Add);
          }
        }}
      >
        <option value="add">Add</option>
        <option value="sub">Subtract</option>
        <option value="mul">Multiply</option>
        <option value="div">Divide</option>
      </select>
      <input
        className="Input"
        type="number"
        defaultValue={0}
        onChange={(e) =>
          setB(new ComplexNumber(parseFloat(e.target.value), a.img))
        }
      />
      <input
        className="Input"
        type="number"
        defaultValue={0}
        onChange={(e) =>
          setB(new ComplexNumber(a.real, parseFloat(e.target.value)))
        }
      />
      <div>{display(a, b, op).text(precision)}</div>
    </>
  );
}

export default ComplexNumbers;

class ComplexNumber {
  public real: number;
  public img: number;

  constructor(real: number, img: number) {
    this.real = real;
    this.img = img;
  }

  round(number: number, digits: number) {
    return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  text(precision: number): string {
    return (
      this.round(this.real, precision) +
      (this.img < 0 ? " - " : " + ") +
      Math.abs(this.round(this.img, precision)) +
      "i"
    );
  }

  textEuler(precision: number): string {
    let r = Math.sqrt(this.real * this.real + this.img * this.img);
    let phi = Math.atan2(this.img, this.real);
    return (
      this.round(r, precision) + " ⋅ exp(i⋅" + this.round(phi, precision) + ")"
    );
  }

  public static eulerToPolar(r: number, phi: number): ComplexNumber {
    let p = phi % (2 * Math.PI);
    return new ComplexNumber(r * Math.cos(p), r * Math.sin(p));
  }

  add(other: ComplexNumber) {
    return new ComplexNumber(this.real + other.real, this.img + other.img);
  }

  subtract(other: ComplexNumber) {
    return new ComplexNumber(this.real - other.real, this.img - other.img);
  }

  scale(number: number) {
    return new ComplexNumber(this.real * number, this.img * number);
  }

  multiply(other: ComplexNumber) {
    return new ComplexNumber(
      this.real * other.real - this.img * other.img,
      this.img * other.real + this.real * other.img
    );
  }

  divide(other: ComplexNumber) {
    let a = other.real;
    let b = other.img;
    let c = this.real;
    let d = this.img;
    let nReal = (c * a + b * d) / (a * a + b * b);
    let nImg = (a * d - c * b) / (a * a + b * b);
    return new ComplexNumber(nReal, nImg);
  }
}
