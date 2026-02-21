#!/usr/bin/env python3
"""Open the provided URL in the system's default browser."""

import argparse
import webbrowser


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Open the given URL in the default web browser."
    )
    parser.add_argument("url", help="The URL to open")
    args = parser.parse_args()

    webbrowser.open(args.url, new=2)


if __name__ == "__main__":
    main()
