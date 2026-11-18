import { ImageResponse } from "next/og";

export const runtime = "edge";

const fullLogoPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAFUCAMAAABMTDSHAAAA8FBMVEXw7+vs6uby8Ozu7ejq6eX18/D29PH08e3t6+fv7enz9O/4+fT08+749/X59PH29/Pw8ezz9PPx7ejx8+319vDu6ebh39rl497u7+rn5+EjLz44R13c2tTX1M7SzsjMx8Hr5uAnN03Ewr2glY1iEh2+urN9HzBwFia4sauooJmwqKGTi4XF2uzo1dHX2do6PkiKLkCRfnhgLDFOU15/dnBjbn5hYWZ9X1xyQUSbYWhPFhzkyMeQl6GufIDHzNJQXXV2e4WISVHOtLKePFDe4eb77OmxuMOgp7F9iZm2XXC+lJXYnajgtrvLeIr43t0MER0/qH/fAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAgAElEQVR4nO2dB18aTRDG6WAjQuSod8BRpLzUo0oRkKKI+v2/zft7ZvcaTTBqTOJgjB5F7s+zO7Ozs3uWC9jZ2dnZ1dkhRg+/uMD/P443L5nLdXXlYubdYa7d5nw/Oydzv4PZLo1mUaEexPTi7MJ7gS8O9ezVm25e3P4xqGdXr3MF07ML/v1bqa9CfV2oF+zrwqhU3hn82G0XW5W6X6Z/sFJtZEalvkrVC5ikUg0q9QH7oXp/eDWwRmJvY/o1oV6aoZLzOVSpgIkfzjSoXvSy+6hqBrYM5T6o+3C+H9RTZu8B9SfZJtQDjUmUdQMXZ6ztQ6u7O4AL3EPNnh/gKHfr1AUnprmxj4HKiZ6env78+ctQfxqgMqIHQwXFi7Mz6kzZj+TZL7z8y9B1GuwMVNHmtSMEE1/7me6l+q5QQfVXmV7iZmRqsxzg9Fl/Smip6cPADIy9Zxc/QPvHNrvQoHKuDNc+qIzpPq5fEOrPdahgyrByh7UDKnNUvEclqKwLOPuBaOBApV5xqLsd1B8HFUg3oWrcNGA7pErRlEGpFz+8F4TiYo9SvcyMzd97LFTzgSPhfYpSL3coVQutdrX+iw2lkudncetOpXp/N9TTj4WKDnWzTzUKdY9SyUtRz6pDBWUI1Xv2w3v2VZV6+uFKBdbQuqM6dNivOX/+GZBU2T1bGz8MCtaZ7oNqIGjqQnXK/J6jiOpYjQdOf/48Pf0JprC3AyWRbnVURxgLU+nmRcx/5oVWz3RHtNW87H5O7nWorneAakJ4unGA4/wlqqbR/puh8uGUKQfw2tjfRQP+b6h7oLIelajC358hXjr78eow1WuAuqc7VaX5jymVRQH0Dy2fOlUWi+4B6uVY93qo3YP+PwSqTvTIPpUGVeSbgJUPp0iyryv1woXu4hClGlCaoJ7yY2+AumFfBqqaS2Eu34tBP8sDbg+nTEp1XbguEHsdmus3KHON6dXVXwWVtXn2gzpqpYQquta95iWdXly4Lg6CamrwRq6c7rZR0pFcPxKq2+0+pvmzgIqxJaVSqOrdnqLSvb8LOEH0AnGq661QT69OT4+B6vwjoJL3Z18UWlF/SsOsH/vtAkB9+O4jam9VKusBjof681Ohzo6Eqn95MYri/ekr3t8FnfpYQOs6FOqpqks1wOJaJb0eCHWPWj8Mqntmc9uOb/5qAMAmoOHSX/P+LtajguvhSmUADWPWt0F1fjZUwnrUdIr+xZme/WBx1X6lXlz4GNIjlKoyNUA9vfr6UG0zt839i0r18jz0IUq90JTqOkipG1A55y8JVWN6pFIp2Kf8CX5jBSj4tp+qy+VyQac+n89Fv3DbA9XlcplewhhOHRqn7ub5blAx2+9222wWmDFKPUqpNIzibkot6jmjmar9UH2s9ZuHTEdA1amSfL8QVPc2qEd5fxIqiVWtoaJvaNWHQPW9A9TDR1S/B6r7TUolU30957o/pHL5OFOjUvf3qYDq+hSov0Jzp1JfG6bqiX61JmXLHP92pboo4qcIdUOpr3j/z1Pq+0LlOn0dqmGC9eIHmv7OmdMNu+CD/U3z/rVKZVz3QtXjJ7X1s2KfQ";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(125deg, #f8f6ef 0%, #f0ede4 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 18,
            border: "1px solid rgba(10, 27, 51, 0.16)",
            borderRadius: 18,
            display: "flex",
          }}
        />
        <div
          style={{
            width: 400,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background: "linear-gradient(145deg, #07172d 0%, #102b4d 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 28,
              border: "1px solid rgba(198, 165, 92, 0.48)",
              borderRadius: 15,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 5,
              background: "linear-gradient(180deg, #e5d09b, #c6a55c, #86682c)",
              display: "flex",
            }}
          />
          <img
            src={fullLogoPng}
            width="340"
            height="340"
            style={{
              width: 340,
              height: 340,
              objectFit: "contain",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "52px 62px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#92713a",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.24em",
            }}
          >
            <div
              style={{
                width: 30,
                height: 2,
                background: "#c6a55c",
                display: "flex",
              }}
            />
            PRETORIA · SOUTH AFRICA
          </div>
          <div
            style={{
              marginTop: 25,
              color: "#0a1b33",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Six practices.</span>
            <span style={{ color: "#9c7b40" }}>Deliberate depth.</span>
          </div>
          <div
            style={{
              width: 74,
              height: 3,
              marginTop: 26,
              background: "linear-gradient(90deg, #c6a55c, #e5d09b)",
              display: "flex",
            }}
          />
          <div
            style={{
              maxWidth: 560,
              marginTop: 24,
              color: "#35465b",
              fontSize: 21,
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Commercial disputes · Finance · Property · Development · Transactions
          </div>
          <div
            style={{
              position: "absolute",
              right: 62,
              bottom: 43,
              color: "#88744e",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.16em",
              display: "flex",
            }}
          >
            EVIDENCE OVER SLOGANS
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
