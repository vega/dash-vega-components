# How to cut a new release
1. Make certain your branch is in sync with head and then create a new release branch:

        git pull origin main
        git switch -c version_0.2.0

2. Update version to, e.g. 0.2.0 in `package.json`

3. Commit change and push:

        git add . -u
        git commit -m "MAINT: Bump version to 0.2.0"
        git push

4. Merge release branch into main, make sure that all required checks pass

5. On main, build new version and test it

        git checkout main
        git pull
        npm install
        npm run build

        python usage.py

6. Build source & wheel distributions:

        rm -rf dist
        python setup.py sdist bdist_wheel

7. Publish to PyPI (Requires correct PyPI owner permissions):

        twine upload dist/*

8. On main, tag the release:

        git tag -a v0.2.0 -m "Version 0.2.0 release"
        git push origin v0.2.0

9. Add release in https://github.com/binste/dash-vega-components/releases and select the version tag

10. Update version to e.g. 0.3.0dev in `package.json` in new branch

        git switch -c maint_0.3.0dev

11. Commit change and push:

        git add . -u
        git commit -m "MAINT: Bump version to 0.3.0dev"
        git push

12. Merge maintenance branch into main